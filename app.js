const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [{
            name: 'Bước Qua Nhau',
            singer: 'Vũ',
            path: './music/Buoc qua nhau ... Vũ.mp3',
            image: './img/vu_profile.jpg'
        },
        {
            name: 'Bước Qua Mùa Cô Đơn',
            singer: 'Vũ',
            path: './music/Bước qua mùa cô đơn - Vũ..mp3',
            image: './img/Bước qua mùa cô đơn.jpg'
        },
        {
            name: 'Chuyện Đôi Ta',
            singer: 'Emcee L (Da LAB) ft Muội',
            path: './music/Chuyện Đôi Ta  - Emcee L Ft Muộii (lofi ver.).mp3',
            image: './img/Chuyện đôi ta.jpg'
        },
        {
            name: 'Giữa Đại Lộ Đông Tây',
            singer: 'Uyên Linh',
            path: './music/giữa đại lộ đông tây-uyên linh.mp3',
            image: './img/giữa đại lộ đông tây.jpg'
        },
        {
            name: 'Nàng Thơ',
            singer: 'Hoàng Dũng',
            path: './music/Nàng Thơ - Hoàng Dũng.mp3',
            image: './img/Nàng thơ.jpg'
        },
        {
            name: 'Sinh Ra Đã Là Thứ Đối Lập Nhau',
            singer: 'Emcee L (Da LAB) ft Badbie',
            path: './music/Sinh Ra Đã Là Thứ Đối Lập Nhau Freak D Lofi Ver  Emcee L Da LAB ft Badbie.mp3',
            image: './img/srdltdln.jpg'
        },
        {
            name: 'Bao Tiền Một Mớ Bình Yên',
            singer: '14 Casper & Bon official',
            path: './music/Bao tiền một mớ bình yên - 14 Casper & Bon official.mp3',
            image: './img/kasper.jpg'
        },
        {
            name: 'Thói Quen',
            singer: 'Hoàng Dũng',
            path: './music/Thói quen- Hoàng Dũng ft. G Ducky.mp3',
            image: './img/25.jpg'
        },
        {
            name: 'Chia Xa',
            singer: 'Dương Edward',
            path: './music/Chia Xa - Duong Edward.mp3',
            image: './img/chia xa.jpg'
        },
        {
            name: 'Xin Lỗi, Hạnh Phúc Mới',
            singer: 'Vũ',
            path: './music/Xin Lỗi, Hạnh Phúc Mới - Vũ.mp3',
            image: './img/hạnh phúc mới.jpg'
        },
        {
            name: 'Chạy Về Nơi Phía Anh',
            singer: 'Khắc Việt',
            path: './music/Chạy Về Nơi Phía Anh - Khắc Việt.mp3',
            image: './img/chạy về nơi phía anh.jpg'
        },
        {
            name: 'Có Chàng Trai Viết Lên Cây',
            singer: 'Phan Mạnh Quỳnh',
            path: './music/CO CHANG TRAI VIET LEN CAY - PHAN MANH QUYNH  AUDIO LYRIC OFFICIAL.mp3',
            image: './img/cctvlc.jpg'
        },
        {
            name: 'Có Điều Gì Sao Không Nói Cùng Anh',
            singer: 'Trung Quân',
            path: './music/Có Điều Gì Sao Không Nói Cùng Anh - Trung Quân Idol.mp3',
            image: './img/có điều gì sao kh nói cùng anh.jpg'
        },
        {
            name: 'Đông Kiếm Em',
            singer: 'Vũ',
            path: './music/ĐÔNG KIẾM EM _ Vũ. (Original).mp3',
            image: './img/đông kiếm em.jpg'
        },
        {
            name: 'Hẹn Một Mai',
            singer: 'Bùi Anh Tuấn',
            path: './music/Hẹn Một Mai.mp3',
            image: './img/hẹn một mai.jpg'
        },
        {
            name: 'Nụ Cười Em Là Nắng',
            singer: 'Green',
            path: './music/Nụ Cười Em Là Nắng - Green「Cukak Remix」- Audio Lyrics Video.mp3',
            image: './img/nụ cười em là nắng.jpg'
        },
        {
            name: 'Sợ Rằng Em Biết Anh Còn Yêu Em',
            singer: 'Juun Đăng Dũng',
            path: './music/Sợ Rằng Em Biết Anh Còn Yêu Em.mp3',
            image: './img/juun.jpg'
        },
        {
            name: 'Tháng Tư Là Lời Nói Dối Của Em',
            singer: 'Hà Anh Tuấn',
            path: './music/Tháng Tư Là Lời Nói Dối Của Em - Hà Anh Tuấn.mp3',
            image: './img/tháng tư là lời nói dối của em.jpg'
        },
        {
            name: 'Tình Nào Không Như Tình Đầu',
            singer: 'Trung Quân',
            path: './music/Tình nào không như tình đầu - Trung Quân Idol _ OFFICIAL MV.mp3',
            image: './img/tinhg nào không như tình đầu.jpg'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index= '${index}'>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        })

        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iteration: Infinity,
        })
        cdThumbAnimate.pause()

        //Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        //Khi song pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //Khi progress chạy
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //Xử lý khi tua
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //Khi next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Xử lý khi bật / tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Xử lý lặp lại một song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        //Xử lý next song khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                //Xử lý khi click vào song
                if (e.target.closest('.song:not(.active)')) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                //Xử lý khi click vào song option
                if (e.target.closest('.option')) {}
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },


    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },

    start: function() {
        //Gán cấu hình từ config vào ứng dụng
        this.loadConfig()

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render()

        //Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()