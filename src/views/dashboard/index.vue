<template>
  <div class="main">
    <AppBreadcrumb>
      <template #content>
        <div>1111</div>
      </template>
    </AppBreadcrumb>
    <div class="content">
      <div v-for="(months, index) in images" :key="index">
        {{ index }}
        <div class="content-image">
          <div class="image" v-for="(image, i) in months" :key="i" @click="clickPhoto(image.id)">
            <img class="img-responsive" :src="image.src" alt="image" />
          </div>
        </div>
      </div>
    </div>
    <a-modal
      title=""
      width="100%"
      :footer="null"
      :closable="false"
      v-model:visible="visible"
      wrap-class-name="full-modal"
      @keydown="keyboardActionDialog($event)"
    >
      <AppImageGallery
        ref="viewer"
        @left="navigate(-1)"
        @right="navigate(1)"
        :nextPhoto="nextPhoto"
        :prevPhoto="prevPhoto"
        :currentPhoto="currentPhoto"
        :direction="imageViewerDirection"
        :total-photo="totalPhoto"
        @close="close()"
      />
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
// import AppBreadcrumb from '../../components/AppBreadcrumb.vue'
// import AppImageGallery from '../../components/AppBreadcrumb.vue'
export default {
  components: {
    // AppBreadcrumb,
    // AppImageGallery
  },
  data() {
    return {
      visible: false,
      imageViewerDirection: 0,
      images: {
        '05/2023': [
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/IMG_0327.jpg',
              ExifToolVersion: 12.62,
              FileName: 'IMG_0327.jpg',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '4.6MB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:05:2323:28:57+07:00',
              FileAccessDate: '2023:05:2501:13:06+07:00',
              FileCreateDate: '2023:05:2323:28:57+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'JPEG',
              FileTypeExtension: 'jpg',
              MIMEType: 'image/jpeg',
              JFIFVersion: 1.01,
              ExifByteOrder: 'Big-endian(Motorola,MM)',
              Make: 'Apple',
              Model: 'iPhone12',
              Orientation: 'Rotate90CW',
              XResolution: 72,
              YResolution: 72,
              ResolutionUnit: 'inches',
              Software: 16.1,
              ModifyDate: '2023:05:0820:31:11',
              HostComputer: 'iPhone12',
              YCbCrPositioning: 'Centered',
              ExposureTime: '1/50',
              FNumber: 1.6,
              ExposureProgram: 'ProgramAE',
              ISO: 160,
              ExifVersion: '0232',
              DateTimeOriginal: '2023:05:0820:31:11',
              CreateDate: '2023:05:0820:31:11',
              OffsetTime: '+07:00',
              OffsetTimeOriginal: '+07:00',
              OffsetTimeDigitized: '+07:00',
              ComponentsConfiguration: 'Y,Cb,Cr,-',
              ShutterSpeedValue: '1/50',
              ApertureValue: 1.6,
              BrightnessValue: 2.202835151,
              ExposureCompensation: 0,
              MeteringMode: 'Multi-segment',
              Flash: 'Off,Didnotfire',
              FocalLength: '4.2mm',
              SubjectArea: '2009150222081387',
              MakerNoteVersion: 14,
              RunTimeFlags: 'Valid',
              RunTimeValue: 376250022153375,
              RunTimeScale: 1000000000,
              RunTimeEpoch: 0,
              AEStable: 'Yes',
              AETarget: 206,
              AEAverage: 212,
              AFStable: 'Yes',
              AccelerationVector: '-0.02333026005-0.06226702409-0.9867352841',
              FocusDistanceRange: '0.45-1.73m',
              LivePhotoVideoIndex: 1112547328,
              HDRHeadroom: 0.8432090282,
              SignalToNoiseRatio: 35.94391635,
              FocusPosition: 124,
              HDRGain: 0,
              SubSecTimeOriginal: 773,
              SubSecTimeDigitized: 773,
              FlashpixVersion: '0100',
              ColorSpace: 'Uncalibrated',
              ExifImageWidth: 4032,
              ExifImageHeight: 3024,
              SensingMethod: 'One-chipcolorarea',
              SceneType: 'Directlyphotographed',
              ExposureMode: 'Auto',
              WhiteBalance: 'Auto',
              FocalLengthIn35mmFormat: '26mm',
              SceneCaptureType: 'Standard',
              LensInfo: '1.549999952-4.2mmf/1.6-2.4',
              LensMake: 'Apple',
              LensModel: 'iPhone12backdualwidecamera4.2mmf/1.6',
              CompositeImage: 'GeneralCompositeImage',
              GPSLatitudeRef: 'North',
              GPSLongitudeRef: 'East',
              GPSAltitudeRef: 'AboveSeaLevel',
              GPSSpeedRef: 'km/h',
              GPSSpeed: 0,
              GPSImgDirectionRef: 'TrueNorth',
              GPSImgDirection: 310.7492063,
              GPSDestBearingRef: 'TrueNorth',
              GPSDestBearing: 310.7492063,
              GPSDateStamp: '2023:05:08',
              GPSHPositioningError: '35m',
              Compression: 'JPEG(old-style)',
              ThumbnailOffset: 2518,
              ThumbnailLength: 7874,
              MPFVersion: '0100',
              NumberOfImages: 2,
              MPImageFlags: '(none)',
              MPImageFormat: 'JPEG',
              MPImageType: 'Undefined',
              MPImageLength: 110358,
              MPImageStart: 4467860,
              DependentImage1EntryNumber: 0,
              DependentImage2EntryNumber: 0,
              ProfileCMMType: 'AppleComputerInc.',
              ProfileVersion: '4.0.0',
              ProfileClass: 'DisplayDeviceProfile',
              ColorSpaceData: 'RGB',
              ProfileConnectionSpace: 'XYZ',
              ProfileDateTime: '2022:01:0100:00:00',
              ProfileFileSignature: 'acsp',
              PrimaryPlatform: 'AppleComputerInc.',
              CMMFlags: 'NotEmbedded,Independent',
              DeviceManufacturer: 'AppleComputerInc.',
              DeviceModel: '',
              DeviceAttributes: 'Reflective,Glossy,Positive,Color',
              RenderingIntent: 'Perceptual',
              ConnectionSpaceIlluminant: '0.964210.82491',
              ProfileCreator: 'AppleComputerInc.',
              ProfileID: 'ecfda38e388547c36db4bd4f7ada182f',
              ProfileDescription: 'DisplayP3',
              ProfileCopyright: 'CopyrightAppleInc.,2022',
              MediaWhitePoint: '0.9641910.82489',
              RedMatrixColumn: '0.515120.2412-0.00105',
              GreenMatrixColumn: '0.291980.692250.04189',
              BlueMatrixColumn: '0.15710.066570.78407',
              RedTRC: '(Binarydata32bytes,use-boptiontoextract)',
              ChromaticAdaptation:
                '1.047880.02292-0.05020.029590.99048-0.01706-0.009230.015080.75168',
              BlueTRC: '(Binarydata32bytes,use-boptiontoextract)',
              GreenTRC: '(Binarydata32bytes,use-boptiontoextract)',
              ImageWidth: 4032,
              ImageHeight: 3024,
              EncodingProcess: 'BaselineDCT,Huffmancoding',
              BitsPerSample: 8,
              ColorComponents: 3,
              YCbCrSubSampling: 'YCbCr4:2:0(22)',
              RunTimeSincePowerUp: '4days8:30:50',
              Aperture: 1.6,
              ImageSize: '4032x3024',
              Megapixels: 12.2,
              ScaleFactor35efl: 6.2,
              ShutterSpeed: '1/50',
              SubSecCreateDate: '2023:05:0820:31:11.773+07:00',
              SubSecDateTimeOriginal: '2023:05:0820:31:11.773+07:00',
              SubSecModifyDate: '2023:05:0820:31:11+07:00',
              ThumbnailImage: '(Binarydata7874bytes,use-boptiontoextract)',
              GPSAltitude: '16.1mAboveSeaLevel',
              GPSLatitude: '+21.010097',
              GPSLongitude: '+105.856003',
              MPImage2: '(Binarydata110358bytes,use-boptiontoextract)',
              CircleOfConfusion: '0.005mm',
              FOV: '69.4deg',
              FocalLength35efl: '4.2mm(35mmequivalent:26.0mm)',
              GPSPosition: '+21.010097,+105.856003',
              HyperfocalDistance: '2.27m',
              LightValue: 6.3,
              LensID: 'iPhone12backdualwidecamera4.2mmf/1.6'
            }
          },
          {
            id: 2,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
            description: 'Test',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/IMG_0327.JPG',
              ExifToolVersion: 12.62,
              FileName: 'IMG_0327.JPG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '4.6MB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:05:2323:28:57+07:00',
              FileAccessDate: '2023:05:2422:45:44+07:00',
              FileCreateDate: '2023:05:2323:28:57+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'JPEG',
              FileTypeExtension: 'jpg',
              MIMEType: 'image/jpeg',
              JFIFVersion: 1.01,
              ExifByteOrder: 'Big-endian(Motorola,MM)',
              Make: 'Apple',
              Model: 'iPhone12',
              Orientation: 'Rotate90CW',
              XResolution: 72,
              YResolution: 72,
              ResolutionUnit: 'inches',
              Software: 16.1,
              ModifyDate: '2023:05:0820:31:11',
              HostComputer: 'iPhone12',
              YCbCrPositioning: 'Centered',
              ExposureTime: '1/50',
              FNumber: 1.6,
              ExposureProgram: 'ProgramAE',
              ISO: 160,
              ExifVersion: '0232',
              DateTimeOriginal: '2023:05:0820:31:11',
              CreateDate: '2023:05:0820:31:11',
              OffsetTime: '+07:00',
              OffsetTimeOriginal: '+07:00',
              OffsetTimeDigitized: '+07:00',
              ComponentsConfiguration: 'Y,Cb,Cr,-',
              ShutterSpeedValue: '1/50',
              ApertureValue: 1.6,
              BrightnessValue: 2.202835151,
              ExposureCompensation: 0,
              MeteringMode: 'Multi-segment',
              Flash: 'Off,Didnotfire',
              FocalLength: '4.2mm',
              SubjectArea: '2009150222081387',
              MakerNoteVersion: 14,
              RunTimeFlags: 'Valid',
              RunTimeValue: 376250022153375,
              RunTimeScale: 1000000000,
              RunTimeEpoch: 0,
              AEStable: 'Yes',
              AETarget: 206,
              AEAverage: 212,
              AFStable: 'Yes',
              AccelerationVector: '-0.02333026005-0.06226702409-0.9867352841',
              FocusDistanceRange: '0.45-1.73m',
              LivePhotoVideoIndex: 1112547328,
              HDRHeadroom: 0.8432090282,
              SignalToNoiseRatio: 35.94391635,
              FocusPosition: 124,
              HDRGain: 0,
              SubSecTimeOriginal: 773,
              SubSecTimeDigitized: 773,
              FlashpixVersion: '0100',
              ColorSpace: 'Uncalibrated',
              ExifImageWidth: 4032,
              ExifImageHeight: 3024,
              SensingMethod: 'One-chipcolorarea',
              SceneType: 'Directlyphotographed',
              ExposureMode: 'Auto',
              WhiteBalance: 'Auto',
              FocalLengthIn35mmFormat: '26mm',
              SceneCaptureType: 'Standard',
              LensInfo: '1.549999952-4.2mmf/1.6-2.4',
              LensMake: 'Apple',
              LensModel: 'iPhone12backdualwidecamera4.2mmf/1.6',
              CompositeImage: 'GeneralCompositeImage',
              GPSLatitudeRef: 'North',
              GPSLongitudeRef: 'East',
              GPSAltitudeRef: 'AboveSeaLevel',
              GPSSpeedRef: 'km/h',
              GPSSpeed: 0,
              GPSImgDirectionRef: 'TrueNorth',
              GPSImgDirection: 310.7492063,
              GPSDestBearingRef: 'TrueNorth',
              GPSDestBearing: 310.7492063,
              GPSDateStamp: '2023:05:08',
              GPSHPositioningError: '35m',
              Compression: 'JPEG(old-style)',
              ThumbnailOffset: 2518,
              ThumbnailLength: 7874,
              MPFVersion: '0100',
              NumberOfImages: 2,
              MPImageFlags: '(none)',
              MPImageFormat: 'JPEG',
              MPImageType: 'Undefined',
              MPImageLength: 110358,
              MPImageStart: 4467860,
              DependentImage1EntryNumber: 0,
              DependentImage2EntryNumber: 0,
              ProfileCMMType: 'AppleComputerInc.',
              ProfileVersion: '4.0.0',
              ProfileClass: 'DisplayDeviceProfile',
              ColorSpaceData: 'RGB',
              ProfileConnectionSpace: 'XYZ',
              ProfileDateTime: '2022:01:0100:00:00',
              ProfileFileSignature: 'acsp',
              PrimaryPlatform: 'AppleComputerInc.',
              CMMFlags: 'NotEmbedded,Independent',
              DeviceManufacturer: 'AppleComputerInc.',
              DeviceModel: '',
              DeviceAttributes: 'Reflective,Glossy,Positive,Color',
              RenderingIntent: 'Perceptual',
              ConnectionSpaceIlluminant: '0.964210.82491',
              ProfileCreator: 'AppleComputerInc.',
              ProfileID: 'ecfda38e388547c36db4bd4f7ada182f',
              ProfileDescription: 'DisplayP3',
              ProfileCopyright: 'CopyrightAppleInc.,2022',
              MediaWhitePoint: '0.9641910.82489',
              RedMatrixColumn: '0.515120.2412-0.00105',
              GreenMatrixColumn: '0.291980.692250.04189',
              BlueMatrixColumn: '0.15710.066570.78407',
              RedTRC: '(Binarydata32bytes,use-boptiontoextract)',
              ChromaticAdaptation:
                '1.047880.02292-0.05020.029590.99048-0.01706-0.009230.015080.75168',
              BlueTRC: '(Binarydata32bytes,use-boptiontoextract)',
              GreenTRC: '(Binarydata32bytes,use-boptiontoextract)',
              ImageWidth: 4032,
              ImageHeight: 3024,
              EncodingProcess: 'BaselineDCT,Huffmancoding',
              BitsPerSample: 8,
              ColorComponents: 3,
              YCbCrSubSampling: 'YCbCr4:2:0(22)',
              RunTimeSincePowerUp: '4days8:30:50',
              Aperture: 1.6,
              ImageSize: '4032x3024',
              Megapixels: 12.2,
              ScaleFactor35efl: 6.2,
              ShutterSpeed: '1/50',
              SubSecCreateDate: '2023:05:0820:31:11.773+07:00',
              SubSecDateTimeOriginal: '2023:05:0820:31:11.773+07:00',
              SubSecModifyDate: '2023:05:0820:31:11+07:00',
              ThumbnailImage: '(Binarydata7874bytes,use-boptiontoextract)',
              GPSAltitude: '16.1mAboveSeaLevel',
              GPSLatitude: '21.010097N',
              GPSLongitude: '105.856003E',
              MPImage2: '(Binarydata110358bytes,use-boptiontoextract)',
              CircleOfConfusion: '0.005mm',
              FOV: '69.4deg',
              FocalLength35efl: '4.2mm(35mmequivalent:26.0mm)',
              GPSPosition: '21.010097N,105.856003E',
              HyperfocalDistance: '2.27m',
              LightValue: 6.3,
              LensID: 'iPhone12backdualwidecamera4.2mmf/1.6'
            }
          },
          {
            id: 3,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/IMG_0327.JPG',
              ExifToolVersion: 12.62,
              FileName: 'IMG_0327.JPG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '4.6MB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:05:2323:28:57+07:00',
              FileAccessDate: '2023:05:2422:45:44+07:00',
              FileCreateDate: '2023:05:2323:28:57+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'JPEG',
              FileTypeExtension: 'jpg',
              MIMEType: 'image/jpeg',
              JFIFVersion: 1.01,
              ExifByteOrder: 'Big-endian(Motorola,MM)',
              Make: 'Apple',
              Model: 'iPhone12',
              Orientation: 'Rotate90CW',
              XResolution: 72,
              YResolution: 72,
              ResolutionUnit: 'inches',
              Software: 16.1,
              ModifyDate: '2023:05:0820:31:11',
              HostComputer: 'iPhone12',
              YCbCrPositioning: 'Centered',
              ExposureTime: '1/50',
              FNumber: 1.6,
              ExposureProgram: 'ProgramAE',
              ISO: 160,
              ExifVersion: '0232',
              DateTimeOriginal: '2023:05:0820:31:11',
              CreateDate: '2023:05:0820:31:11',
              OffsetTime: '+07:00',
              OffsetTimeOriginal: '+07:00',
              OffsetTimeDigitized: '+07:00',
              ComponentsConfiguration: 'Y,Cb,Cr,-',
              ShutterSpeedValue: '1/50',
              ApertureValue: 1.6,
              BrightnessValue: 2.202835151,
              ExposureCompensation: 0,
              MeteringMode: 'Multi-segment',
              Flash: 'Off,Didnotfire',
              FocalLength: '4.2mm',
              SubjectArea: '2009150222081387',
              MakerNoteVersion: 14,
              RunTimeFlags: 'Valid',
              RunTimeValue: 376250022153375,
              RunTimeScale: 1000000000,
              RunTimeEpoch: 0,
              AEStable: 'Yes',
              AETarget: 206,
              AEAverage: 212,
              AFStable: 'Yes',
              AccelerationVector: '-0.02333026005-0.06226702409-0.9867352841',
              FocusDistanceRange: '0.45-1.73m',
              LivePhotoVideoIndex: 1112547328,
              HDRHeadroom: 0.8432090282,
              SignalToNoiseRatio: 35.94391635,
              FocusPosition: 124,
              HDRGain: 0,
              SubSecTimeOriginal: 773,
              SubSecTimeDigitized: 773,
              FlashpixVersion: '0100',
              ColorSpace: 'Uncalibrated',
              ExifImageWidth: 4032,
              ExifImageHeight: 3024,
              SensingMethod: 'One-chipcolorarea',
              SceneType: 'Directlyphotographed',
              ExposureMode: 'Auto',
              WhiteBalance: 'Auto',
              FocalLengthIn35mmFormat: '26mm',
              SceneCaptureType: 'Standard',
              LensInfo: '1.549999952-4.2mmf/1.6-2.4',
              LensMake: 'Apple',
              LensModel: 'iPhone12backdualwidecamera4.2mmf/1.6',
              CompositeImage: 'GeneralCompositeImage',
              GPSLatitudeRef: 'North',
              GPSLongitudeRef: 'East',
              GPSAltitudeRef: 'AboveSeaLevel',
              GPSSpeedRef: 'km/h',
              GPSSpeed: 0,
              GPSImgDirectionRef: 'TrueNorth',
              GPSImgDirection: 310.7492063,
              GPSDestBearingRef: 'TrueNorth',
              GPSDestBearing: 310.7492063,
              GPSDateStamp: '2023:05:08',
              GPSHPositioningError: '35m',
              Compression: 'JPEG(old-style)',
              ThumbnailOffset: 2518,
              ThumbnailLength: 7874,
              MPFVersion: '0100',
              NumberOfImages: 2,
              MPImageFlags: '(none)',
              MPImageFormat: 'JPEG',
              MPImageType: 'Undefined',
              MPImageLength: 110358,
              MPImageStart: 4467860,
              DependentImage1EntryNumber: 0,
              DependentImage2EntryNumber: 0,
              ProfileCMMType: 'AppleComputerInc.',
              ProfileVersion: '4.0.0',
              ProfileClass: 'DisplayDeviceProfile',
              ColorSpaceData: 'RGB',
              ProfileConnectionSpace: 'XYZ',
              ProfileDateTime: '2022:01:0100:00:00',
              ProfileFileSignature: 'acsp',
              PrimaryPlatform: 'AppleComputerInc.',
              CMMFlags: 'NotEmbedded,Independent',
              DeviceManufacturer: 'AppleComputerInc.',
              DeviceModel: '',
              DeviceAttributes: 'Reflective,Glossy,Positive,Color',
              RenderingIntent: 'Perceptual',
              ConnectionSpaceIlluminant: '0.964210.82491',
              ProfileCreator: 'AppleComputerInc.',
              ProfileID: 'ecfda38e388547c36db4bd4f7ada182f',
              ProfileDescription: 'DisplayP3',
              ProfileCopyright: 'CopyrightAppleInc.,2022',
              MediaWhitePoint: '0.9641910.82489',
              RedMatrixColumn: '0.515120.2412-0.00105',
              GreenMatrixColumn: '0.291980.692250.04189',
              BlueMatrixColumn: '0.15710.066570.78407',
              RedTRC: '(Binarydata32bytes,use-boptiontoextract)',
              ChromaticAdaptation:
                '1.047880.02292-0.05020.029590.99048-0.01706-0.009230.015080.75168',
              BlueTRC: '(Binarydata32bytes,use-boptiontoextract)',
              GreenTRC: '(Binarydata32bytes,use-boptiontoextract)',
              ImageWidth: 4032,
              ImageHeight: 3024,
              EncodingProcess: 'BaselineDCT,Huffmancoding',
              BitsPerSample: 8,
              ColorComponents: 3,
              YCbCrSubSampling: 'YCbCr4:2:0(22)',
              RunTimeSincePowerUp: '4days8:30:50',
              Aperture: 1.6,
              ImageSize: '4032x3024',
              Megapixels: 12.2,
              ScaleFactor35efl: 6.2,
              ShutterSpeed: '1/50',
              SubSecCreateDate: '2023:05:0820:31:11.773+07:00',
              SubSecDateTimeOriginal: '2023:05:0820:31:11.773+07:00',
              SubSecModifyDate: '2023:05:0820:31:11+07:00',
              ThumbnailImage: '(Binarydata7874bytes,use-boptiontoextract)',
              GPSAltitude: '16.1mAboveSeaLevel',
              GPSLatitude: '21.013097N',
              GPSLongitude: '105.856003E',
              MPImage2: '(Binarydata110358bytes,use-boptiontoextract)',
              CircleOfConfusion: '0.005mm',
              FOV: '69.4deg',
              FocalLength35efl: '4.2mm(35mmequivalent:26.0mm)',
              GPSPosition: '21.010097N,105.856003E',
              HyperfocalDistance: '2.27m',
              LightValue: 6.3,
              LensID: 'iPhone12backdualwidecamera4.2mmf/1.6'
            }
          },
          {
            id: 4,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/1.PNG',
              ExifToolVersion: 12.62,
              FileName: '1.PNG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '956 kB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:03:08 20:34:25+07:00',
              FileAccessDate: '2023:05:24 21:49:55+07:00',
              FileCreateDate: '2023:03:08 20:34:16+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'PNG',
              FileTypeExtension: 'png',
              MIMEType: 'image/png',
              ImageWidth: 1574,
              ImageHeight: 1036,
              BitDepth: 8,
              ColorType: 'RGB with Alpha',
              Compression: 'Deflate/Inflate',
              Filter: 'Adaptive',
              Interlace: 'Noninterlaced',
              SRGBRendering: 'Perceptual',
              ImageSize: '1574x1036',
              Megapixels: 1.6
            }
          }
        ],
        '04/2023': [
          {
            id: 5,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/1.PNG',
              ExifToolVersion: 12.62,
              FileName: '1.PNG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '956 kB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:03:08 20:34:25+07:00',
              FileAccessDate: '2023:05:24 21:49:55+07:00',
              FileCreateDate: '2023:03:08 20:34:16+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'PNG',
              FileTypeExtension: 'png',
              MIMEType: 'image/png',
              ImageWidth: 1574,
              ImageHeight: 1036,
              BitDepth: 8,
              ColorType: 'RGB with Alpha',
              Compression: 'Deflate/Inflate',
              Filter: 'Adaptive',
              Interlace: 'Noninterlaced',
              SRGBRendering: 'Perceptual',
              ImageSize: '1574x1036',
              Megapixels: 1.6
            }
          },
          {
            id: 6,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/1.PNG',
              ExifToolVersion: 12.62,
              FileName: '1.PNG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '956 kB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:03:08 20:34:25+07:00',
              FileAccessDate: '2023:05:24 21:49:55+07:00',
              FileCreateDate: '2023:03:08 20:34:16+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'PNG',
              FileTypeExtension: 'png',
              MIMEType: 'image/png',
              ImageWidth: 1574,
              ImageHeight: 1036,
              BitDepth: 8,
              ColorType: 'RGB with Alpha',
              Compression: 'Deflate/Inflate',
              Filter: 'Adaptive',
              Interlace: 'Noninterlaced',
              SRGBRendering: 'Perceptual',
              ImageSize: '1574x1036',
              Megapixels: 1.6
            }
          }
        ],
        '03/2023': [
          {
            id: 7,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/1.PNG',
              ExifToolVersion: 12.62,
              FileName: '1.PNG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '956 kB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:03:08 20:34:25+07:00',
              FileAccessDate: '2023:05:24 21:49:55+07:00',
              FileCreateDate: '2023:03:08 20:34:16+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'PNG',
              FileTypeExtension: 'png',
              MIMEType: 'image/png',
              ImageWidth: 1574,
              ImageHeight: 1036,
              BitDepth: 8,
              ColorType: 'RGB with Alpha',
              Compression: 'Deflate/Inflate',
              Filter: 'Adaptive',
              Interlace: 'Noninterlaced',
              SRGBRendering: 'Perceptual',
              ImageSize: '1574x1036',
              Megapixels: 1.6
            }
          },
          {
            id: 8,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
            description: '',
            modified_at: 1678281925335,
            size: 2099181,
            name: '324F0419-B456-45B6-AA52-A602FDA5B17C.jpeg',
            exif: {
              SourceFile: 'C:/Users/Kien/Desktop/final-project/1.PNG',
              ExifToolVersion: 12.62,
              FileName: '1.PNG',
              Directory: 'C:/Users/Kien/Desktop/final-project',
              FileSize: '956 kB',
              ZoneIdentifier: 'Exists',
              FileModifyDate: '2023:03:08 20:34:25+07:00',
              FileAccessDate: '2023:05:24 21:49:55+07:00',
              FileCreateDate: '2023:03:08 20:34:16+07:00',
              FilePermissions: '-rw-rw-rw-',
              FileType: 'PNG',
              FileTypeExtension: 'png',
              MIMEType: 'image/png',
              ImageWidth: 1574,
              ImageHeight: 1036,
              BitDepth: 8,
              ColorType: 'RGB with Alpha',
              Compression: 'Deflate/Inflate',
              Filter: 'Adaptive',
              Interlace: 'Noninterlaced',
              SRGBRendering: 'Perceptual',
              ImageSize: '1574x1036',
              Megapixels: 1.6
            }
          }
        ]
      },
      imagesList: [],
      currentPhoto: null,
      prevPhoto: null,
      nextPhoto: null
    }
  },
  computed: {},
  created() {
    this.$root.$refs.loading.start()
    // console.log(import.meta.env.VITE_MAPBOX_API)
    for (const property in this.images) {
      // console.log(this.images[property])
      this.images[property].forEach((element) => {
        this.imagesList.push(element)
      })
    }
    this.totalPhoto = this.imagesList.length
    setInterval(() => {
      this.$root.$refs.loading.finish()
    }, 500)
  },
  methods: {
    clickPhoto(id) {
      const index = this.imagesList.findIndex((e) => e.id === id)
      if (index >= 0) {
        this.visible = true
        this.imageViewerDirection = 0
        this.currentPhoto = {
          index: index,
          photo: this.imagesList[index]
        }
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      } else {
        message.error('Error')
      }
    },
    getNextSectionSegmentAsset(currentAsset, dir) {
      const assetLength = this.totalPhoto
      let nextIndex = currentAsset.index + dir
      let nextPhoto = this.imagesList[nextIndex]
      if (nextIndex < 0) {
        nextIndex = 0
        nextPhoto = currentAsset.photo
      }
      if (nextIndex > assetLength - 1) {
        nextIndex = currentAsset.index
        nextPhoto = currentAsset.photo
      }
      return {
        index: nextIndex,
        photo: nextPhoto
      }
    },
    navigate(dir) {
      this.imageViewerDirection = dir
      if (dir === 1) {
        this.prevPhoto = this.currentPhoto
        this.currentPhoto = this.nextPhoto
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      } else {
        this.nextPhoto = this.currentPhoto
        this.currentPhoto = this.prevPhoto
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
      }
      // console.log(this.imageViewerDirection)
      // this.$refs.viewer.handleDescription()
    },
    keyboardActionDialog(event) {
      if (event.code == 'ArrowLeft') {
        if (this.currentPhoto.index === 0) return
        this.navigate(-1)
      } else if (event.code == 'ArrowRight') {
        this.navigate(1)
      } else if (event.code == 'Escape') {
        this.clearNav()
      }
    },
    clearNav() {
      this.currentPhoto = null
      this.prevPhoto = null
      this.nextPhoto = null
    },
    close() {
      this.visible = false
      this.$nextTick(() => {
        this.clearNav()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .content {
    &-image {
      display: flex;
    }
    .content-image {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      .image {
        height: 220px;

        .img-responsive {
          height: 220px;
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.ant-modal-wrap {
  overflow: hidden !important;
}
.full-modal {
  .ant-modal {
    padding: 0 !important;
    max-width: 100%;
    top: 0;
    // padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    // height: calc(100vh);
    background-color: #000;
  }
  .ant-modal-body {
    padding: 0;
    flex: 1;
  }
}
</style>
