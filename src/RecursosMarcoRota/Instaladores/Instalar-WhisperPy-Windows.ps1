pip install -U torch torchvision torchaudio openai-whisper --index-url https://download.pytorch.org/whl/cu118 *>&1 | out-null
cp src/RecursosMarcoRota/PluginsMovibles/txy.js plugins/txy.js
Write-Host Si todo salio bien, deberias poder usar .txy por un audio para empezar la transcripcion. La precisin y velocidad pueden ser mayores con whispercpp en caso de que no tengas una Grafica NvidiaCUDA. La documentacion en https://github.com/openai/whisper
