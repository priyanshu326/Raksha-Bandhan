const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

const intro = document.getElementById("intro");

let playing = false;
let soundOn = true;
let audioCtx = null;

const petals = [];


/* =========================
   CANVAS RESIZE
========================= */

function resize() {
    canvas.width =
        window.innerWidth * devicePixelRatio;

    canvas.height =
        window.innerHeight * devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );
}

window.addEventListener(
    "resize",
    resize
);

resize();


/* =========================
   PETALS
========================= */

function makePetal() {

    return {
        x:
            Math.random() *
            window.innerWidth,

        y:
            -24 -
            Math.random() * 90,

        r:
            5 +
            Math.random() * 8,

        vy:
            0.55 +
            Math.random() * 1.35,

        vx:
            -0.35 +
            Math.random() * 0.7,

        rot:
            Math.random() *
            Math.PI *
            2,

        vr:
            -0.03 +
            Math.random() * 0.06,

        color:
            Math.random() > 0.42
                ? "#e37a2c"
                : "#d45a78",

        inner:
            Math.random() > 0.42
                ? "#f4c14a"
                : "#f0a3b8",

        sway:
            Math.random() *
            Math.PI *
            2,

        a:
            0.55 +
            Math.random() * 0.4
    };
}


for (let i = 0; i < 52; i++) {

    const p = makePetal();

    p.y =
        Math.random() *
        window.innerHeight;

    petals.push(p);
}


/* =========================
   REMOVE BLACK BACKGROUND
   FROM IMAGES
========================= */

function knockBlack(img, thresh) {

    return img.decode()
        .then(function () {

            const c =
                document.createElement("canvas");

            const w = img.naturalWidth;
            const h = img.naturalHeight;

            if (!w || !h) {
                return;
            }

            c.width = w;
            c.height = h;

            const g =
                c.getContext(
                    "2d",
                    {
                        willReadFrequently: true
                    }
                );

            g.drawImage(
                img,
                0,
                0
            );

            const imageData =
                g.getImageData(
                    0,
                    0,
                    w,
                    h
                );

            const d =
                imageData.data;

            const vis =
                new Uint8Array(
                    w * h
                );

            const q = [];


            function isBg(idx) {

                const o =
                    idx * 4;

                const a =
                    d[o + 3];

                if (a < 10) {
                    return true;
                }

                const lum =
                    0.2126 * d[o] +
                    0.7152 * d[o + 1] +
                    0.0722 * d[o + 2];

                return lum < thresh;
            }


            function tryPush(x, y) {

                if (
                    x < 0 ||
                    y < 0 ||
                    x >= w ||
                    y >= h
                ) {
                    return;
                }

                const idx =
                    y * w + x;

                if (vis[idx]) {
                    return;
                }

                vis[idx] = 1;

                if (isBg(idx)) {
                    q.push(idx);
                }
            }


            for (let x = 0; x < w; x++) {

                tryPush(x, 0);

                tryPush(
                    x,
                    h - 1
                );
            }


            for (let y = 0; y < h; y++) {

                tryPush(0, y);

                tryPush(
                    w - 1,
                    y
                );
            }


            while (q.length) {

                const idx =
                    q.pop();

                d[
                    idx * 4 + 3
                ] = 0;

                const x =
                    idx % w;

                const y =
                    (idx / w) | 0;

                tryPush(
                    x + 1,
                    y
                );

                tryPush(
                    x - 1,
                    y
                );

                tryPush(
                    x,
                    y + 1
                );

                tryPush(
                    x,
                    y - 1
                );
            }


            g.putImageData(
                imageData,
                0,
                0
            );

            img.src =
                c.toDataURL(
                    "image/webp"
                );

        })
        .catch(function () {
            // Keep original image
        });
}


knockBlack(
    document.querySelector(".sister"),
    40
);

knockBlack(
    document.querySelector(".brother"),
    36
);

knockBlack(
    document.querySelector(".diya.left"),
    34
);

knockBlack(
    document.querySelector(".diya.right"),
    34
);


/* =========================
   PETAL ANIMATION
========================= */

function tick() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    for (const p of petals) {

        p.sway += 0.01;

        p.x +=
            p.vx +
            Math.sin(p.sway) *
            0.35;

        p.y += p.vy;

        p.rot += p.vr;


        if (
            p.y >
            window.innerHeight + 28
        ) {

            Object.assign(
                p,
                makePetal()
            );
        }


        ctx.save();


        ctx.translate(
            p.x,
            p.y
        );


        ctx.rotate(
            p.rot
        );


        ctx.globalAlpha =
            p.a;

        ctx.fillStyle =
            p.color;


        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            p.r * 0.55,
            p.r,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.fillStyle =
            p.inner;

        ctx.globalAlpha =
            p.a * 0.8;


        ctx.beginPath();

        ctx.ellipse(
            0,
            -p.r * 0.15,
            p.r * 0.22,
            p.r * 0.55,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.restore();
    }


    requestAnimationFrame(
        tick
    );
}

requestAnimationFrame(
    tick
);


/* =========================
   AUDIO
========================= */

function ensureAudio() {

    if (!audioCtx) {

        audioCtx =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }


    if (
        audioCtx.state ===
        "suspended"
    ) {

        audioCtx.resume();
    }
}


function playTone(
    freq,
    time,
    dur,
    type,
    gain
) {

    if (
        !soundOn ||
        !audioCtx
    ) {
        return;
    }


    const osc =
        audioCtx.createOscillator();

    const g =
        audioCtx.createGain();


    osc.type =
        type;

    osc.frequency.value =
        freq;


    g.gain.setValueAtTime(
        0,
        time
    );


    g.gain.linearRampToValueAtTime(
        gain,
        time + 0.03
    );


    g.gain.exponentialRampToValueAtTime(
        0.0001,
        time + dur
    );


    osc.connect(g);

    g.connect(
        audioCtx.destination
    );


    osc.start(time);

    osc.stop(
        time + dur + 0.05
    );
}


function playBell(
    freq,
    when,
    gain = 0.08
) {

    playTone(
        freq,
        when,
        1.6,
        "sine",
        gain
    );

    playTone(
        freq * 2.01,
        when,
        1.1,
        "triangle",
        gain * 0.22
    );
}


/* =========================
   SOUNDTRACK
========================= */

function soundtrack() {

    if (!soundOn) {
        return;
    }


    ensureAudio();


    const t =
        audioCtx.currentTime;


    const drone =
        audioCtx.createOscillator();

    const drone2 =
        audioCtx.createOscillator();

    const dg =
        audioCtx.createGain();


    drone.type =
        "sine";

    drone2.type =
        "sine";


    drone.frequency.value =
        110;

    drone2.frequency.value =
        165;


    dg.gain.setValueAtTime(
        0,
        t
    );


    dg.gain.linearRampToValueAtTime(
        0.032,
        t + 1.3
    );


    dg.gain.setValueAtTime(
        0.032,
        t + 10
    );


    dg.gain.linearRampToValueAtTime(
        0.0001,
        t + 14
    );


    drone.connect(dg);

    drone2.connect(dg);

    dg.connect(
        audioCtx.destination
    );


    drone.start(t);

    drone2.start(t);


    drone.stop(
        t + 14.2
    );

    drone2.stop(
        t + 14.2
    );


    playBell(
        523.25,
        t + 0.35,
        0.07
    );

    playBell(
        659.25,
        t + 1.05,
        0.06
    );

    playBell(
        783.99,
        t + 1.75,
        0.07
    );

    playBell(
        1046.5,
        t + 4.5,
        0.09
    );

    playBell(
        1318.5,
        t + 7.2,
        0.11
    );

    playBell(
        987.77,
        t + 7.45,
        0.07
    );

    playBell(
        784,
        t + 8.2,
        0.08
    );
}


/* =========================
   RESTART ANIMATION
========================= */

function restartAnimation() {

    document.body.classList.remove(
        "playing"
    );

    void document.body.offsetWidth;

    document.body.classList.add(
        "playing"
    );

    soundtrack();
}


/* =========================
   BEGIN BUTTON
========================= */

document
    .getElementById("begin")
    .addEventListener(
        "click",
        () => {

            ensureAudio();

            playing = true;

            intro.classList.add(
                "hide"
            );

            restartAnimation();
        }
    );


/* =========================
   REPLAY BUTTON
========================= */

document
    .getElementById("replay")
    .addEventListener(
        "click",
        () => {

            ensureAudio();

            restartAnimation();
        }
    );


/* =========================
   MUTE BUTTON
========================= */

document
    .getElementById("mute")
    .addEventListener(
        "click",
        (e) => {

            soundOn =
                !soundOn;

            e.target.textContent =
                soundOn
                    ? "Sound on"
                    : "Sound off";


            if (soundOn) {
                ensureAudio();
            }
        }
    );