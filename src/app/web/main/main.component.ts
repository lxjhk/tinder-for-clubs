import { Component, OnInit, NgZone } from '@angular/core';
declare var loop;
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    users: any = [
        { src: './assets/images/swiper/cat-1.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-2.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-3.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-4.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-5.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-6.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-7.jpg', name: '', style: {}, site: {} },
        { src: './assets/images/swiper/cat-8.jpg', name: '', style: {}, site: {} }
    ]
    doc_width;
    userInfo;
    constructor(public _ngZone: NgZone) {
    }

    ngOnInit() {
        this.doc_width = document.getElementById('swiper').clientWidth;
        loop.ready((status) => {
            this.getuser();
        })
    }
    getuser() {
        loop.getUserInfo({
            param: { appName: 'Loop' },
            error: (err) => { },
            success: (resp) => {
                console.log('====================================');
                console.log(resp);
                this.userInfo = resp;
                this._ngZone.run(() => { });
                console.log('====================================');
            }
        });
    }
    touchstart(event, user) {
        user.site._x_start = event.touches[0].pageX;
        user.site._y_start = event.touches[0].pageY;
    }
    touchmove(event, user) {
        user.site._x_move = event.touches[0].pageX;
        user.site._y_move = event.touches[0].pageY;
        user.site.top_val = parseFloat(user.site._y_move) - parseFloat(user.site._y_start);
        user.site.left_val = parseFloat(user.site._x_move) - parseFloat(user.site._x_start);
        user.style = { "transform": "translate3d(" + user.site.left_val + "px," + user.site.top_val + "px,0px)", "transition-duration": "0s" }
    }
    touchend(event, user) {
        user.site._x_end = event.changedTouches[0].pageX;
        user.site._y_end = event.changedTouches[0].pageY;
        if (user.site.left_val > 0 && user.site.left_val > this.doc_width / 2 - this.doc_width / 4.5) {
            this.animateMove(user, 1);
        } else if (user.site.left_val < 0 && user.site.left_val < -this.doc_width / 2 + this.doc_width / 4.5) {
            this.animateMove(user, -1);
        } else {
            this.animateReset(user);
        }
    }

    animateMove(user, val) {
        /*CSS3动画方式*/
        user.style = { "transform": "translate3d(" + this.doc_width * val + "px," + user.site.top_val * 2.2 + "px,0px)", "transition-duration": "0.3s" };
        let _user = { src: user.src, name: user.name, style: {}, site: {} };
        this.users.unshift(_user);
        setTimeout(() => {
            this.users.pop();
        }, 400)
        // var moveTime = setTimeout(function () {
        //     el.remove();
        //     var ind_el = $("#ind-" + (photoSwipe.index));
        //     photoSwipe.activeEl(ind_el);
        //     photoSwipe.index++;
        //     $("#photo_box>div>div").append(photoSwipe.imgHtml());
        //     photoSwipe.run = true;
        // }, 300);
    }
    animateReset(user) {
        user.style = { "transform": "translate3d(0px,0px,0px)", "transition-duration": "0.3s" };
    }
    unLove() {
        let user = this.users[this.users.length - 1];
        user.style = { "transform": "translate3d(" + this.doc_width * -1 + "px," + 45 * 2.2 + "px,0px)", "transition-duration": "0.3s" };
        let _user = { src: user.src, name: user.name, style: {}, site: {} };
        this.users.unshift(_user);
        setTimeout(() => {
            this.users.pop();
        }, 400)
    }
    love() {
        let user = this.users[this.users.length - 1];
        user.style = { "transform": "translate3d(" + this.doc_width * 1 + "px," + 45 * 2.2 + "px,0px)", "transition-duration": "0.3s" };
        let _user = { src: user.src, name: user.name, style: {}, site: {} };
        this.users.unshift(_user);
        setTimeout(() => {
            this.users.pop();
        }, 400)
    }
}
