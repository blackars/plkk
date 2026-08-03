param(
    [int]$TargetSize = 32,
    [string]$SourceWebp = "public/assets/images/logos/GPalenkke.webp",
    [string]$OutputCur = "public/assets/images/logos/GPalenkke.cur"
)

Add-Type -AssemblyName PresentationCore

$repoRoot = Split-Path -Parent $PSScriptRoot
$src = Join-Path $repoRoot $SourceWebp
$out = Join-Path $repoRoot $OutputCur

if (-not (Test-Path -LiteralPath $src)) { throw "Source not found: $src" }

$stream = [System.IO.File]::OpenRead($src)
try {
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
        $stream,
        [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat,
        [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
    )
} finally {
    $stream.Dispose()
}
$frame = $decoder.Frames[0]

$scale = [Math]::Min($TargetSize / $frame.PixelWidth, $TargetSize / $frame.PixelHeight)
$width = [int][Math]::Max(1, [Math]::Round($frame.PixelWidth * $scale))
$height = [int][Math]::Max(1, [Math]::Round($frame.PixelHeight * $scale))

$transform = New-Object System.Windows.Media.ScaleTransform($scale, $scale)
$scaled = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, $transform)
$scaled.Freeze()

$pngStream = New-Object System.IO.MemoryStream
$encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
$encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($scaled))
$encoder.Save($pngStream)
$pngBytes = $pngStream.ToArray()
$pngStream.Dispose()

$hotspotX = [int][Math]::Floor($width / 2)
$hotspotY = [int][Math]::Floor($height / 2)

$output = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.BinaryWriter($output)
$writer.Write([uint16]0)
$writer.Write([uint16]2)
$writer.Write([uint16]1)
$writer.Write([byte][Math]::Min($width, 255))
$writer.Write([byte][Math]::Min($height, 255))
$writer.Write([byte]0)
$writer.Write([byte]0)
$writer.Write([uint16]$hotspotX)
$writer.Write([uint16]$hotspotY)
$writer.Write([uint32]$pngBytes.Length)
$writer.Write([uint32]22)
$writer.Write($pngBytes)
$writer.Flush()

$outDir = Split-Path -Parent $out
if (-not (Test-Path -LiteralPath $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
[System.IO.File]::WriteAllBytes($out, $output.ToArray())
$writer.Dispose()
$output.Dispose()

Write-Output "Generated $out ($width x $height px, hotspot $hotspotX,$hotspotY)"
