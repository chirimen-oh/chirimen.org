module.exports = {
  title: 'CHIRIMEN 対応デバイスレシピ集', // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: 'CHIRIMEN Open Hardware Community <chirimen.open.hardware@gmail.com>', // default to `author` in `package.json` or undefined.
  language: 'ja', // default to undefined.
  size: 'A5', // paper size.
  theme: ['@vivliostyle/theme-techbook@^2.0.0', 'custom.css'], // .css or local dir or npm package. default to undefined.
  entry: [
    // './docs/index.md',
    {
      path: 'toc.md',
      rel: 'contents',
      title: '目次',
      sectionDepth: 3,
    },
    './docs/intro.md',
    './docs/about.md',
    './docs/hello-real-world-vol1/index.md',
    './docs/hello-real-world-vol2/index.md',
    './docs/hello-real-world-vol3/index.md',
    './docs/hello-real-world-vol6/index.md',
    './docs/hello-real-world-vol7/index.md',
    './docs/hello-real-world-vol8/index.md',
    './docs/hello-real-world-vol4/index.md',
    './docs/hello-real-world-vol5/index.md',
    './docs/gpio-polling/index.md',
    './docs/gpio-inout-vol1/index.md',
    './docs/gpio-inout-vol2/index.md',
    './docs/gpio-onchange/index.md',
    './docs/gpio-camera/index.md',
    './docs/adt7410/index.md',
    './docs/aht10/index.md',
    './docs/aht20/index.md',
    './docs/htu21d/index.md',
    './docs/sht30/index.md',
    './docs/sht40/index.md',
    './docs/bmp180/index.md',
    './docs/bmp280/index.md',
    './docs/bme280/index.md',
    './docs/ens160/index.md',
    './docs/sgp40/index.md',
    './docs/scd40/index.md',
    './docs/bh1750/index.md',
    './docs/ltr390/index.md',
    './docs/tsl2561/index.md',
    './docs/tsl2591/index.md',
    './docs/veml6070/index.md',
    './docs/tcs34725/index.md',
    './docs/s11059/index.md',
    './docs/adxl345/index.md',
    './docs/icm20948/index.md',
    './docs/mpu6050/index.md',
    './docs/mpu9250/index.md',
    './docs/gp2y0e03/index.md',
    './docs/vl53l0x/index.md',
    './docs/vl53l1x/index.md',
    './docs/as5600/index.md',
    './docs/paj7620/index.md',
    './docs/as3935/index.md',
    './docs/ssd1306/index.md',
    './docs/ssd1308/index.md',
    './docs/ht16k33/index.md',
    './docs/neopixel-i2c/index.md',
    './docs/waveshare20471/index.md',
    './docs/a4988/index.md',
    './docs/hbridge1/index.md',
    './docs/hbridge2-pca9685pwm/index.md',
    './docs/pca9685/index.md',
    './docs/ads1015/index.md',
    './docs/ads1115-loadcell/index.md',
    './docs/ads1x15/index.md',
    './docs/pcf8591/index.md',
    './docs/ina219/index.md',
    './docs/dfplayer/index.md',
    './docs/isd1820/index.md',
    './docs/serial_gps/index.md',
    './docs/amg8833/index.md',
    './docs/mlx90614/index.md',
    './docs/mpr121/index.md',
    './docs/thanks.md',
    // {
    //   path: 'epigraph.md',
    //   title: 'Epigraph', // title can be overwritten (entry > file),
    //   theme: '@vivliostyle/theme-whatever', // theme can be set individually. default to the root `theme`.
    // },
    // 'glossary.html', // html can be passed.
  ], // `entry` can be `string` or `object` if there's only single markdown file.
  // entryContext: './manuscripts', // default to '.' (relative to `vivliostyle.config.js`).
  // output: [ // path to generate draft file(s). default to '{title}.pdf'
  //   './output.pdf', // the output format will be inferred from the name.
  //   {
  //     path: './book',
  //     format: 'webpub',
  //   },
  // ],
  // workspaceDir: '.vivliostyle', // directory which is saved intermediate files.
  toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // tocTitle: '目次',
  // cover: './cover.png', // cover image. default to undefined.
  // vfm: { // options of VFM processor
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
}
