var Home=Vue.component("Home",{
    template:`<div class="home"><Nav></Nav>
                <div class="imgs">
              <img src="http://www.sxuek.com/statics/images/uek/new_logo.png" alt=""></div></div>`

});
var Nav=Vue.component("Nav",{
    template:`<div class="nav">
              <router-link :to="item.url" v-for="(item,key) in data" :key="key" exact tag="li">{{item.title}}</router-link>
              <router-link to="/login" v-if="!islogin" tag="li">登陆</router-link>
              <span v-if="islogin" class="infos" @click="show">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
              </div>`,
    data(){
        return {
            data:[
                {title:"首页",url:"/"},
                {title:"公司简介",url:"/info"},
                {title:"产品介绍",url:"/doc"}
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
});
var Info=Vue.component("info",{
    template:`<div class="info">
                <Nav></Nav>
                <transition name="opacity" mode="out-in">
                    <router-view></router-view>
                </transition>
              </div>`
});
var list=Vue.component("list",{
    template:`<ul class="mui-table-view"  style="padding-top: 44px">
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/1">
                        <img class="mui-media-object mui-pull-left" src="">
                        <div class="mui-media-body">
                            幸福
                            <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                        </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/2">
                        <img class="mui-media-object mui-pull-left" src="">
                        <div class="mui-media-body">
                            木屋
                            <p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                        </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/3">
                        <img class="mui-media-object mui-pull-left" src="">
                        <div class="mui-media-body">
                            CBD
                            <p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
                        </div>
                    </router-link>
                </li>
</ul>`
});
var Con=Vue.component("con",{
   template:`<div style="position: absolute;top: 44px">
                <h3>{{data[$route.params.id-1].title}}</h3>
                <p>{{data[$route.params.id-1].con}}</p>
             </div>` ,
    data(){
       return {
           data:[
               {title:"111",con:"这是第一篇内容"},
               {title:"222",con:"这是第二篇内容"},
               {title:"333",con:"这是第三篇内容"}
           ]
       }
    }
});
var Doc=Vue.component("doc",{
    template:`<div class="doc">
                <Nav></Nav>
                <router-view name="left" class="left"></router-view>
                <router-view name="right" class="right"></router-view>
              </div>`,
    beforeRouteEnter(to,from,next){
        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
});
var left=Vue.component("left",{
    template:`<ul class="left1">
                <router-link tag="li" to="#one">one</router-link>
                <router-link tag="li" to="#two">two</router-link>
                <router-link tag="li" to="#three">three</router-link>
              </ul>`,
    watch:{
        $route(){
            var hash=this.$route.hash.slice(1);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ start: document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ start: document.querySelector("#"+hash).offsetTop}, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.start.toFixed(0)
                })
                .start()
            animate()
        }
    }
});
var right=Vue.component("right",{
    template:`<ul class="right1">
                <li>111</li>
                <li>111</li>
                <li id="one">one</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li id="two">two</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li id="three">three</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
              </ul>`
});
var Login=Vue.component("login",{
    template:`<div class="login">
<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-undo" @click="back"></a>
		    <h1 class="mui-title">登陆</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div></div>`,
    methods:{
        back(){
            router.go(-1);
        },
        submit(){

            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.go(-1)
        }

    }
})