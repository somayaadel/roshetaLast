<template>
  <div>
    <nav class="navHerz">
      <div class="navHerz__logo">
        <img class="navHerz__logoimg" src="@/assets/image/logo.png" alt="" />
      </div>
      <div class="navHerz__logoIcons">
       
        <div class="navHerz__logoIconsCircle">
          <i class="far fa-bell"></i>
        </div>
        <div class="logout">
          <a @click="logout"><i class="fas fa-sign-out-alt"></i> Logout </a>
        </div>
      </div>
    </nav>
    <div class="navVer">
        <ul class=" navVer__list-group">

            
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="fas fa-puzzle-piece"></i>

                    </div>
                    <div class="col-10">
                        <router-link to="/" class="text-color"> Dashboard</router-link>

                    </div>
                </div>

            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                       <i class="fas fa-user-injured"></i>
                    </div>
                    <div class="col-10">
                        <router-link to="/patients" class="text-color"> Patients</router-link>
                    </div>
                </div>
            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                       <i class="fas fa-user-md"></i>
                    </div>
                    <div class="col-10">
                        <router-link to="/doctors" class="text-color">Doctors</router-link>

                    </div>
                </div>
            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="far fa-comments"></i>
                    </div>
                    <div class="col-10">
                        <router-link to="/Booking" class="text-color"> Bookings</router-link>

                    </div>
                </div>
            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="far fa-comments"></i>
                    </div>
                    <div class="col-10">
                        <router-link to="/feedback" class="text-color"> Rates & Reviews</router-link>

                    </div>
                </div>
            </li>
           
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="fas fa-file"></i>
                    </div>
                    <div class="col-10">

                        <router-link to="/pages" class="text-color"> Pages</router-link>

                    </div>
                </div>
            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                       <i class="fas fa-map-marker-alt"></i>

                    </div>
                    <div class="col-10">

                        <router-link to="/locations" class="text-color"> Locations</router-link>

                    </div>
                </div>
            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="fas fa-users"></i>

                    </div>
                    <div class="col-10">

                        <router-link to="/Contacts" class="text-color"> Contacts</router-link>

                    </div>
                </div>
            </li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="fas fa-cog"></i>

                    </div>
                    <div class="col-10">

                        <router-link to="/specializations" class="text-color"> Specializations</router-link>

                    </div>
                </div>
            </li>
           <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="fas fa-users"></i>

                    </div>
                    <div class="col-10">

                        <router-link to="/services" class="text-color"> Services</router-link>

                    </div>
                </div>
            </li>
           
            
           
            
        </ul>
        <!-- <ul class=" navVer__list-group"> -->

            <!-- <li class=" mt-3 navVer__Header font-weight-bolder ">Account</li>
            <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">

                    <div class="col-2">
                        <i class="fas fa-cog"></i>

                    </div>
                    <div class="col-10">
                        <router-link to="/setting_page" class="text-color"> Settings</router-link>
                    </div>
                </div>

            </li> -->
            <!-- <li class=" navVer__list-group-item">
                <span class="navVer__line"></span>

                <div class="row">
                    <div class="col-2">
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                    <div class="col-10">
                       <a @click="logout" class="text-color">Logout</a> 
                    </div>
                </div>
            </li> -->

        <!-- </ul> -->
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        logout: function () {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
            });
        },
    }

}
</script>

<style scoped>
[class^="col-"]{
    padding: 0 12px;
}


</style>
