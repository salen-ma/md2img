# markdown2image

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

transform markdown to img

## Installation

```shell
# install it globally
$ npm install -g markdown2image

# or yarn
$ yarn global add markdown2image
```

## Usage

### Basic Usage

```shell
$ markdown2image <input> [-o|--output] [-w|--width]
Create img complete.
```

### Advanced Usage

使用自己的模板

在根目录添加 .md2imgrc 文件作为模板

.md2imgrc example:

- {{fragment}} 不可修改
- {{layout}} 替换为要使用的 md 样式
  - eg： `https://unpkg.com/github-markdown-css`
- {{highlight}} 替换为要使用的代码高亮样式
  - eg： `https://unpkg.com/prismjs/themes/prism-okaidia.css`
  - 参考 [Prism](https://prismjs.com)
- 其他布局和样式可按需求编写  

```yaml
template: >
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{layout}}" />
    <link rel="stylesheet" href="{{highlight}}">
    <style>
      .markdown-body {
        width: 90%;
        max-width: 700px;
        margin: 20px auto;
      }
    </style>
  </head>
  <body>
    <div class="markdown-body">
      {{fragment}}
    </div>
    <script src="https://unpkg.com/prismjs"></script>
  </body>
  </html>
```

## License

[MIT](LICENSE) &copy; [mashaoliang](https://github.com/salen-ma)

[downloads-image]: https://img.shields.io/npm/dm/markdown2image.svg
[downloads-url]: https://npmjs.org/package/markdown2image
[version-image]: https://img.shields.io/npm/v/markdown2image.svg
[version-url]: https://npmjs.org/package/markdown2image
[license-image]: https://img.shields.io/github/license/salen-ma/md2img.svg
[license-url]: https://github.com/salen-ma/md2img/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/salen-ma/md2img.svg
[dependency-url]: https://david-dm.org/salen-ma/md2img
[devdependency-image]: https://img.shields.io/david/dev/salen-ma/md2img.svg
[devdependency-url]: https://david-dm.org/salen-ma/md2img?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
