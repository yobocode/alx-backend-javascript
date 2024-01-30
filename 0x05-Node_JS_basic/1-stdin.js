/**
 * This code prompts the user for their name and prints it to the standard output stream.
 */
process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const INPUT = process.stdin.read();

  if (INPUT !== null) {
    process.stdout.write(`Your name is: ${INPUT}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
