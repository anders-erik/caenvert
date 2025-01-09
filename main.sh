


case "$1" in

    img2pdf-tall)
        shift
        # caenvert img2pdf input-image-file
        # slices image in vertical parts each ~2500px each, then converts to pdf
        # test: ./main.sh img2pdf-tall /home/user/caenvert/assets/http-wikipedia.png

        # split into smaller images : height 2500
        temp_dir="/tmp/caenvert/img2pdf-$RANDOM/"
        mkdir -p $temp_dir
        convert "$1" -crop x2500 +repage $temp_dir/img.png

        # pdf conversions
        pdf_file=$(echo "$1" | sed -E 's/\.[a-zA-Z0-9]+$/\.pdf/')
        files=$(ls $temp_dir/img-*.png)

        # img2pdf $files -o $pdf_file 2> /dev/null
        img2pdf $files -o $pdf_file

        rm -r $temp_dir
        ;;

    localHtml2pdf)
        shift
        # caenvert img2pdf /absolute/path/to/input.html output.pdf custom.css
        # Test : ./main.sh localHtml2pdf /home/user/caenvert/assets/example.html ./output.pdf 
        node ./playwright/index.mjs $1 $2 $3
        ;;
    
    md2pdf)
        shift
        # caenvert md2pdf input.md output.pdf
        # test: ./main.sh md2pdf ./assets/example.md output.pdf
        pandoc $1 -o $2
        ;;

    *)
        echo "No matching command"
        ;;
esac

