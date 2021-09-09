// Using jQuery because we are using jQuery plugin here
$(document).ready(function () {
    // For CV Headline
    $('#profile_ripple').ripples({
        resolution: 512,
        dropRadius: 10
    });

    const bars = document.querySelectorAll('.progress_bar');
    // console.log(bars);

    bars.forEach(function (bar) {
        let percentage = bar.dataset.percent;
        // console.log(percentage);
        let tooltip = bar.children[0];
        tooltip.innerText = percentage + '%';
        bar.style.width = percentage + '%';

    })

    // This will create the achievement part
    // Using javascript here
    const counters = document.querySelectorAll('.counter');
    // console.log(counters);

    function runCounter() {
        counters.forEach(counter => {
            counter.innerText = 0;

            //Here we have used the '+' sign to make the target variable as int bcz generally counter.dataset.count returns string
            let target = +counter.dataset.count;
            // console.log(target);
            // console.log(typeof (target));

            let step = target / 100;

            let countIt = function () {
                let displayedCount = +counter.innerText;
                if (displayedCount < target) {
                    counter.innerText = Math.ceil(displayedCount + step);
                    // console.log(displayedCount);

                    // Bcz javascript works on single thread, i.e., no wok take place in js when one work is already in progress until the work is finished.
                    setTimeout(countIt, 1); // Here 1 = 1 milliseconds. This setTimeout() will prodive the browser 1 millisecond time to repaint it
                } else {
                    counter.innerText = target;
                }
            }

            countIt();
        })
    }

    // runCounter();

    let counterSection = document.querySelector('.counter_section');

    let options = {
        rootMargin: '0px 0px -200px 0px'
    } // This will enable us to call the sectionObserver when we reach to the margin of -200px of bottom

    let done = 0; // done = 0 means we haven't played the animation yet

    // The intersectiobserver is a new feature of js and an object that enable us to work on a particular area of website which we want
    const sectionObsever = new IntersectionObserver(function (entries) {

        if (entries[0].isIntersecting && done != 1) {
            done = 1; // We have played the animation
            // console.log("Intersecting..!!");
            runCounter();

        }
    }, options)

    sectionObsever.observe(counterSection); // Whom we want to observe here is given in the bracket

    // This will create our work gallery and review part 
    // This will create work gallery part for image filter
    // Using jQuery because we are using jQuery plugin here
    var $wrapper = $('.portfolio_wrapper');

    // Initializing isotope(plugin) for the first link i.e., all(*)
    $wrapper.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });

    let links = document.querySelectorAll('.tabs a');
    // console.log(links);

    links.forEach(link => {

        let selector = link.dataset.filter;
        // console.log(selector);

        link.addEventListener('click', function (e) {
            e.preventDefault(); //This will prevent the default nature of event to scroll up whenever the click happens
            // console.log("Click Happened..!!");

            $wrapper.isotope({
                filter: selector,
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
            })

            // target will give us the link on which we have clicked
            e.target.classList.add('active');

        });
    })

    // Magnify Popup
    $('.magnify').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true
        }
    });

    // This will create our review slider part
    $('.slider').slick({
        arrows: false,
        autoplay: true
    });

});