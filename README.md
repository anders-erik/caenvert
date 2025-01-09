
# Caenvert

CLI utility scripts for file conversions.

*Note: Only tested on ubuntu 22.04 & 24.04.*

## Dependiencies
install by running ` ./scripts/install-deps.sh`
- imagemagick
- ffmpeg
- img2pdf

- pandoc

- node
- playwright + system dependencies
    - `cd ./playwright/ && npm install && sudo npx playwright install-deps`
- test: astral (https://github.com/lino-levan/astral)

## Commands

### img2pdf-tall
`caenvert img2pdf-tall file.png`
Splits a very tall image into smaller image of height 2500px and then assembles these into a pdf with a page from each image.

### html-to-pdf
`caenvert html-to-pdf file.html`
`caenvert html-to-pdf `