compile_dir() {
    cd $1

    for dir in */ ; do
        cd $dir
        for template in `ls *.pug 2>/dev/null`; do
            compiled=`echo $template | cut -d '.' -f 1`
            echo "Compile $template ..."
            pug -c -D $template -n "$compiled.js"
            echo
        done
        cd ..
    done

    cd ..
}

compile_dir 'components'
compile_dir 'view'
