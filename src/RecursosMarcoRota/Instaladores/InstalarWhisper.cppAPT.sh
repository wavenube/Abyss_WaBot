rm -rf whisper.cpp
apt-get install git curl wget make build-essential cmake ffmpeg -y > /dev/null 2>&1
git clone https://github.com/ggerganov/whisper.cpp.git > /dev/null 2>&1 && cd whisper.cpp && ./models/download-ggml-model.sh small > /dev/null 2>&1 && make > /dev/null 2>&1 && cd ../ && chmod +x src/RecursosMarcoRota/ScriptActivo/whispercpp.sh && cp src/RecursosMarcoRota/PluginsMovibles/txt.js plugins/txt.js
echo Si todo salio bien, deberias poder usar .txt por un audio para empezar la transcripcion. La precisin y velocidad pueden ser mayores haciendo unos cambios en el script whispercpp.sh. La documentacion en https://github.com/ggerganov/whisper.cpp
