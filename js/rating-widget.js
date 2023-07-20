//Code taken and modified from https://rating-widget.com/get/rating/
//Code is used to insert required scripts and CSS into hmtl page to get ratings
//and format output.

//Main function to get libraries and data
function getRating(doc, dTime, script, rwURL) {

    // Async Rating-Widget initialization.
    window.RW_Async_Init = function () {

        RW.init({
            huid: "492385",
            uid: "bcbb2db007cd98225eebe458265434f5",
            source: "website",
            options: {
                "advanced": {
                    "layout": {
                        "align": {
                            "hor": "center",
                            "ver": "top"
                        }
                    }
                },
                "style": "oxygen",
                "isDummy": false
            }
        });
        RW.render();
    };
    // Append Rating-Widget JavaScript library.
    var rw,
        s = doc.getElementsByTagName(script)[0],
        id = "rw-js",
        l = doc.location,
        ck = "Y" + dTime.getFullYear() +
            "M" + dTime.getMonth() + "D" + dTime.getDate(),
        p = l.protocol,
        f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
        a = ("https:" == p ? "secure." + rwURL + "js/" : "js." + rwURL);
    if (doc.getElementById(id)) return;
    rw = doc.createElement(script);
    rw.id = id; 
    rw.async = true; 
    rw.type = "text/javascript";
    rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
}
//Call main function with required inputs
getRating(document, new Date(), "script", "rating-widget.com/");