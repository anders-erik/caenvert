#!/bin/bash


function print_help()
{
    echo "Usage: Caenvert {img2pdf-tall|img2pdf|localHtml2pdf|md2pdf} [options]"
    echo ""
    echo "Commands:"
    echo "  img2pdf-tall|img2pdf   Convert a tall image to a multi-page PDF."
    echo "  localHtml2pdf          Convert a local HTML file to PDF using Playwright."
    echo "  md2pdf                 Convert a Markdown file to PDF using Pandoc."
    echo ""
    echo "Examples:"
    echo "  Caenvert img2pdf-tall /path/to/tall-image.png"
    echo "  Caenvert localHtml2pdf /path/to/input.html output.pdf custom.css"
    echo "  Caenvert md2pdf input.md output.pdf"
    exit 1
}

function _img2pdf()
{
    shift
    # caenvert img2pdf input-image-file
    # slices image in vertical parts each ~2500px each, then converts to pdf
    # test: ./main.sh img2pdf-tall /home/user/caenvert/assets/http-wikipedia.png

    # split into images of specific (A4) aspect ratio!
    image_width=$(identify $1 | awk '{print $3}' | grep -Po '^\d*')
    # A4 apect ratio = 1:root(2) -- i.e. height is ~41% greater than width --> 5:7
    A4_height=$(($image_width * 7 / 5))
    

    # split into smaller images : height 2500
    temp_dir="/tmp/caenvert/img2pdf-$RANDOM/"
    mkdir -p $temp_dir
    convert "$1" -crop x$A4_height +repage $temp_dir/img.png

    # Image file only one page. We use img2pdf directly!
    if [ ! -f $temp_dir/img-1.png ]; then
        echo "Output only one page!"
        pdf_file=$(echo "$1" | sed -E 's/\.[a-zA-Z0-9]+$/\.pdf/')
        img2pdf $1 -o $pdf_file
        rm -r $temp_dir
        exit 
    fi

    # pdf conversions
    pdf_file=$(echo "$1" | sed -E 's/\.[a-zA-Z0-9]+$/\.pdf/')
    files=$(ls $temp_dir/img-*.png)

    # img2pdf $files -o $pdf_file 2> /dev/null
    img2pdf $files -o $pdf_file

    rm -r $temp_dir
}

function localHtml2pdf()
{
    # caenvert img2pdf /absolute/path/to/input.html output.pdf custom.css
    # Test : ./main.sh localHtml2pdf /home/user/caenvert/assets/example.html ./output.pdf 
    node ./playwright/index.mjs $1 $2 $3
}

function md2pdf()
{
    # caenvert md2pdf input.md output.pdf
    # test: ./main.sh md2pdf ./assets/example.md output.pdf
    pandoc $1 -o $2
}




case "$1" in

    img2pdf-tall|img2pdf|img_pdf|imgtopdf)
        _img2pdf "$@"
        ;;
    localHtml2pdf)
        shift
        localHtml2pdf $1 $2 $3
        ;;
    md2pdf)
        shift
        md2pdf
        ;;
    help|-h|--help|"")
        print_help
        ;;
    *)
        echo "No matching command"
        ;;
esac

