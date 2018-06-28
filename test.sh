curl \
    --form image=@graph.png \
    --form top-text="Top Text\nwith new line" \
    --form bottom-text="Bottom Text" \
    --form font-size="72" \
    --form line-spacing="-20" \
    --form stroke-width="2" \
    --output output.png \
    http://localhost:8080/generate