var router=new VueRouter({
    linkActiveClass:"active",
    routes:[
        {path:"/",component:Home},
        {
            path:"/info",component:Info,
            children:[
                {path:"",component:list},
                {path:"list/:id",component:Con}
            ]
        },
        {
            path:"/doc",component:Doc,
            children:[
                {path:"",components:{left,right}},
            ]
        },
        {path:"/login",component:Login}
    ]
})