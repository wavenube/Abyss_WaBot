#Descripcion de Banderas: -l es el idioma, se puede de ajustar manualmente para identificacion mas rapida. -t son los nucleos a utilizar, dependiendo de tu hardware seria util disminuirlo para evitar una saturacion del sistema.
ffmpeg -i tmp/audio.ogg -ar 16000 -ac 1 -c:a pcm_s16le -y tmp/output.wav > /dev/null 2>&1
cd whisper.cpp
./main -m models/ggml-small.bin -f ../tmp/output.wav -nt -l es -t 15  2>/dev/null
