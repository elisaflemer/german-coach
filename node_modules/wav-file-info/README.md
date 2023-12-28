# WAV File Info for Node.JS
#### A lightweight module that parses WAV information data from a wav file into a Javascript Object. Basically retrieves file and header meta data information from a WAV file.  

### Used for:
- Determining the validity of a .wav file
- Detecting the bit depth / bit rate / bits per sample of a .wav file
- Detecting the Sample Rate of a .wav file
- Detecting the number of channels in a .wav file
- Retrieving the file information, including file size, created date etc


### Usage

```
npm install wav-file-info --save
```

```javascript
var wavFileInfo = require('wav-file-info');

wavFileInfo.infoByFilename('./test.wav', function(err, info){
  if (err) throw err;
  console.log(info);
});
```
#### if `err` is not null, the WAV file is valid.

From the command line you can run:

```
node wfi.js <filename>
```




### Result

```
{ header:
   { riff_head: 'RIFF',
     chunk_size: 1697504,
     wave_identifier: 'WAVE',
     fmt_identifier: 'fmt ',
     subchunk_size: 16,
     audio_format: 1,
     num_channels: 2,
     sample_rate: 44100,
     byte_rate: 45328,
     block_align: 4,
     bits_per_sample: 16,
     data_identifier: 'PAD ' },
  stats:
   { dev: 16777220,
     mode: 33184,
     nlink: 1,
     uid: 501,
     gid: 20,
     rdev: 0,
     blksize: 4096,
     ino: 71128242,
     size: 1697512,
     blocks: 3320,
     atime: Sun Nov 29 2015 10:13:15 GMT-0700 (MST),
     mtime: Sat May 23 2015 12:45:00 GMT-0600 (MDT),
     ctime: Thu Nov 12 2015 14:31:37 GMT-0700 (MST),
     birthtime: Sat May 23 2015 12:44:55 GMT-0600 (MDT)
  },
  duration: 9.623038548752834
}
```

### Example errors

```
{ error: true,
  invalid_reasons:
   [ 'Expected "RIFF" string at 0',
     'Expected "WAVE" string at 4',
     'Expected "fmt " string at 8',
     'Unknwon format: 25711',
     'chunk_size does not match file size' ] }
```

Duration is in seconds.  Stats come from Node raw fs.statSync() result.

References:
 http://soundfile.sapp.org/doc/WaveFormat/

 TODO: Deep scan [avg amplitude, max amplitude], fork for AIFF
