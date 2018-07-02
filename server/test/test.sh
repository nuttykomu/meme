curl \
    --form image=@test/input.png \
    --form top-text="YOU KNOW YOU'RE A COMPUTER SCIENCE STUDENT" \
    --form bottom-text="WHEN YOUR TEXTBOOK'S TABLE OF CONTENTS\nCAN BE TOPOLOGICALLY SORTED" \
    --form font-size="50" \
    --form stroke-width="0" \
    --form padding="30" \
    --form border=true \
    http://localhost:8080/generate