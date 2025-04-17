const { program } = require('commander');
const fs = require('fs');

program
    .option('-i, --input <path>', 'шлях до вхідного файлу')
    .option('-o, --output <path>', 'шлях до вихідного файлу')
    .option('-d, --display', 'виводити результат в консоль')
    .parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

try {
    const data = fs.readFileSync(options.input, 'utf8');
    const parsedData = JSON.parse(data);
  
    const filteredData = parsedData.filter(function(item) {
        return item.parent === 'BS3_BanksLiab';
    });

    const formattedData = filteredData.map(function(item) {
        return item.txten + ':' + item.value;
    });

    if (options.output) {
        const outputResult = formattedData.join('\n');
        fs.writeFileSync(options.output, outputResult);
    }
  
    if (options.display) {
        formattedData.forEach(function(item) {
            console.log(item);
        });
    }
  
} catch (error) {
    console.error('Error processing file:', error.message);
    process.exit(1);
}
