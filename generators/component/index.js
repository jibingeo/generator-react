
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : 'MyComponent'
    }, {
      type    : 'confirm',
      name    : 'container',
      message : 'Would you like to enable container?',
      default: false
    }, {
      type    : 'confirm',
      name    : 'style',
      message : 'Would you like to enable style?',
      default: true
    }]);
  }

  writing() {
    const { name, container, style } = this.answers;
    let mainFile = name;

    this.fs.copyTpl(
      this.templatePath('Component.tsx.ejs'),
      this.destinationPath(`${name}/${name}.tsx`),
      { name, style }
    );

    if(style) {
      this.fs.copyTpl(
        this.templatePath('Component.css.ejs'),
        this.destinationPath(`${name}/${name}.css`),
        { name }
      );
    }

    if(container) {
      const containerName = `${name}Container`;
      this.fs.copyTpl(
        this.templatePath('ComponentContainer.ts.ejs'),
        this.destinationPath(`${name}/${containerName}.ts`),
        { name, containerName }
      );
      mainFile = containerName;
    }


    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath(`${name}/package.json`),
      { name: mainFile }
    );
  }
};