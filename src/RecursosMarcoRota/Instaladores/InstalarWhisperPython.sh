choco install ffmpeg-full
apt-get install ffmpeg python3-pip -y 2>&1 >/dev/null
pip install -U openai-whisper 2>&1 >/dev/null && pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 2>&1 >/dev/null && cd ../ && cp src/RecursosMarcoRota/PluginsMovibles/txy.js plugins/txy.js
echo Si todo salio bien, deberias poder usar .txy por un audio para empezar la transcripcion. La precisin y velocidad pueden ser mayores con whispercpp en caso de que no tengas una Grafica NvidiaCUDA. La documentacion en https://github.com/openai/whisper

