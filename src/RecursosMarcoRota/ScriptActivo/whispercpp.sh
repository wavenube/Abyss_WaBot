ffmpeg -i tmp/audio.ogg -ar 16000 -ac 1 -c:a pcm_s16le -y tmp/output.wav 2>/dev/null && cd whisper.cpp
./main -m models/ggml-small.bin -f ../tmp/output.wav -nt -l auto  2>/dev/null
