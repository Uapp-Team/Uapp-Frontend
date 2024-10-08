const audio =  [ 'mp3' , 'cda' , 'mid', 'midi' , 'mpa' , 'ogg' , 'wav' , 'wma' , 'wpl'];
const image =  ['jpg' , 'png' , 'jpeg', 'ico' , 'gif' , 'webp' , 'tiff' , 'raw' , 'bmp' , 'heif' , 'jfif'];
const video = ['3g2' , '3gp' , 'avi' , 'flv' , 'h264' , 'm4v' , 'mkv' , 'mov' , 'mp4' , 'mpg' , 'mpeg' , 'rm' , 'swf' , 'vob' , 'wmv'];
const pdf = ['pdf'];
const doc = ['doc' , 'docx'];
const xls = ['xl' , 'xls'];
const ppt = ['ppt'];
const compressed =  ['zip' , 'rar' , '7z'];



export const getExtension = (filename) => {

    const type = filename.split('.').pop();
    console.log(type);
    console.log(typeof(type));

    if(audio?.includes(type)){
        return 'audio';
    }
     if(image?.includes(type)){
        return 'image';
    }
    if(video?.includes(type)){
        return 'video';
    }
   if(pdf?.includes(type)){
        return 'pdf';
    }
   if(doc?.includes(type)){
        return 'doc';
    }
   if(xls?.includes(type)){
        return 'xls';
    }
     if(ppt?.includes(type)){
        return 'ppt';
    }
     if(compressed?.includes(type)){
        return 'compressed';
    }
   
  

}