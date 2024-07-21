import readline from 'readline';

import { deleteTemplate } from './operations';

// Create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for input
rl.question('Which template do you want to delete? ', (answer: string) => {
  const sesObject = {
    Template: {
      TemplateName: answer,
      SubjectPart: '',
      HtmlPart: '',
      TextPart: '',
    },
  };
  deleteTemplate(sesObject);
  rl.close();
});
