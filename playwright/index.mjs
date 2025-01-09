
import { chromium } from "@playwright/test";
import { defineConfig, devices } from '@playwright/test';
import path from "path";

/**
 *  Example print of rust cli book from web
 */
const saveRustCliFromWebPdf = async () => {
    const browser = await chromium.launch(); // Launch a headless Chromium browser
    const page = await browser.newPage();

    // Replace 'file:///path/to/your/file.html' with your HTML file path
    // await page.goto('https://en.wikipedia.org/wiki/2024_United_States_presidential_election', { waitUntil: 'networkidle' });


    // Example print of rust cli book
    await page.goto('https://rust-cli.github.io/book/print.html', { waitUntil: 'networkidle' });
    // await page.emulateMedia({ media: 'screen' });
    await page.addStyleTag({
        content: `
            body, html {
                color: rgb(188, 189, 208);
                background-color: hsl(226, 23%, 11%);
            }

            .hljs,
            .hljs-meta, 
            .hljs-built_in,
            .hljs-string,
            .hljs-keyword,
            .hljs-number,
            .hljs-function,
            .hljs-class,
            .hljs-title,
            .bash {
                background-color: rgb(29, 31, 33);
                color: rgb(197, 200, 198);
            }
        `
    });
    await page.pdf({
        path: 'output-web.pdf', // Output PDF file name
        format: 'A4',      // Adjust the page size ('A4', 'Letter', etc.)
        printBackground: true, // Include CSS background colors/images
    });


    await browser.close();
    console.log('PDF generated as output.pdf');
}

/**
 *  Example print of rust cli book from local archive
 */
const saveRustCliFromLocalFileToPdf = async () => {
    const browser = await chromium.launch(); // Launch a headless Chromium browser
    const page = await browser.newPage();


    // Local file
    const user = "EXAMPLE_USER"
    await page.goto(`file:///home/${EXAMPLE_USER}/Downloads/Command Line Applications in Rust/Command Line Applications in Rust.html`, { waitUntil: 'networkidle' });
    await page.addStyleTag({
        content: `
            .hljs,
            .hljs-meta, 
            .hljs-built_in,
            .hljs-string,
            .hljs-keyword,
            .hljs-number,
            .hljs-function,
            .hljs-class,
            .hljs-title,
            .bash {
                background-color: rgb(29, 31, 33);
                color: rgb(197, 200, 198);
            }
        `
    });
    await page.pdf({
        path: 'output-local.pdf', // Output PDF file name
        format: 'A4',      // Adjust the page size ('A4', 'Letter', etc.)
        printBackground: true, // Include CSS background colors/images

    });

    await browser.close();
    console.log('PDF generated as output.pdf');
}


const saveLocalHtmlARchiveToPdf = async (absoluteInputFilePath, outputPath, customCss = "") => {

    const browser = await chromium.launch(); // Launch a headless Chromium browser
    const page = await browser.newPage();


    // Local file
    await page.goto(`file://${absoluteInputFilePath}`, { waitUntil: 'networkidle' });
    await page.addStyleTag({
        content: `
            /* Apply Css here*/
            ${customCss}
        `
    });
    await page.pdf({
        path: `${outputPath}`,
        format: 'A4',     
        printBackground: true, 
    });

    await browser.close();
    console.log(`PDF generated as ${outputPath}`);
}


// console.log(`argv = ${process.argv[2]}`)
/**
 * string
 */
console.log();


let absoluteInputFilePath = process.argv[2];
let outputPath = process.argv[3];
let customCss = process.argv[4];
if(!absoluteInputFilePath || !outputPath){
    console.error("Must specify input and output file.");
    process.exit()
}

// sanitize paths
// if(inputFilePath[0] === ".")
//     inputFilePath = inputFilePath.substring(1, inputFilePath.length)

saveLocalHtmlARchiveToPdf(absoluteInputFilePath, outputPath, customCss);

// saveRustCliFromWebPdf()
// saveRustCliFromLocalFileToPdf()

