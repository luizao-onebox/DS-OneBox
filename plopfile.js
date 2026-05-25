export default function (plop) {
  plop.setGenerator('component', {
    description: 'Gera um novo componente base do Design System',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome do componente? (Ex: Button, DatePicker)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/shadcn/{{pascalCase name}}.tsx',
        templateFile: '.plop/templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/shadcn/{{pascalCase name}}.stories.tsx',
        templateFile: '.plop/templates/story.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /$/,
        template: 'export { {{pascalCase name}} } from "./components/shadcn/{{pascalCase name}}";'
      }
    ],
  });
}