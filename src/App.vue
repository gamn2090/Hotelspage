<template>
  <div id="app">

      <router-view/>
      
  </div>
</template>

<script>

export default {
    name: 'App',
    mounted(){  
         
        this.Lenguaje =  localStorage.getItem("Lang") ? localStorage.getItem("Lang") : navigator.language.substring(0, 2)
       
    }
}
</script>

<style>
    html{
        scroll-behavior: smooth;
    }
    body{
        background-color: white !important;
    }
    .dropdown.arrow-top{
        background: #ffffff !important;
    }
    .dropdown.arrow-top li a{
        color: rgb(11,119,61) !important;
    }
    .dropdown.arrow-top:before{
        border-color: transparent;
        border-bottom-color: #fff !important;
    }
    a.close,a.next,a.prev{
        color: white !important;
    }
    .site-section{
        padding: 3em 0 !important;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 100% !important;
    }
    .caract-text{
        font-size: 14px;
        color: black;
        text-align: center;
    }
    *{
        box-sizing: border-box;
    }/*fef9e9cc */
    .site-navbar-wrap.scrolled {
        background: rgb(255, 255, 255) !important;
    }
    .site-navbar-wrap.scrolled .site-navbar .site-navigation .site-menu > li > a{
        /*color: rgb(11, 100, 53) !important;*/
        color: rgb(81, 81, 81) !important;
    }
    .five-reasons {
        width: 80%;
        max-width: 1080px;
        bottom: 35px;
    }
    .five-reasons {
        position: absolute;
        z-index: 5;
        left: 50%;        
        transform: translate(-50%, 0);
        text-align: center;
    }
    .five-reasons .five-items {
        width: 100%;
        margin-top: 15px;
        padding: 10px 0px;
        text-align: center;
        /*background: rgba(0, 0, 0, 0.8);*/
    }
    .five-reasons .five-items ul {
        width: 100%;
        display: table;
        padding-left:0px;
    }
    ul {
        list-style: none;
    }
    .five-reasons .five-items ul li {
        width: 20%;
        display: inline-block;
        float: left;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        border-left: 1px solid rgba(255, 255, 255, 0.3);
    }
    .five-reasons .five-items ul li i {
        display: block;
        font-size: 21px;
        margin-bottom: 5px;
        color: rgba(255, 255, 255, 0.7);
    }
    .five-reasons .five-items ul li span {
        display: block;
        font-size: 14px;
        line-height: 150%;
        color: white;
    }
    .stroke{
        color: black;
        -webkit-text-stroke-width: .5px;
        -webkit-text-stroke-color: black;
    }
    .beige-backgound{
        background-color: #ffffff !important;      
    }
  .help-icon{
       margin-left:0 !important;
       margin-top: 40px;
       transition-duration: 0.3s;
   }

   .help-icon:hover{
       cursor: pointer;
       font-size: 25px;
       color:red;
   }
    @media only screen and (max-width: 480px) {
        .five-reasons {
            bottom: -5px;
        }
        .five-reasons .five-items ul li span{
            font-size: 10px;
        }
        .text-button-five{
            font-size: 10px;
        }
        #titleBanner{
            font-size:11px;
        }
        .Carousel{
            top:25%;
        }
    }
</style>
