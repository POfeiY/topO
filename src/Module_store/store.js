import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

import scheduleStore from '../components/info/schedule/scheduleStore.js'
import addStudio from "../components/info/studio/studioStore/addStudio.js"
import studioList from "../components/info/studio/studioStore/studioList.js"
import updateStudio from "../components/info/studio/studioStore/updateStudio.js"
import counter from "../components/info/movie/store/store.js"
import addTheater from '../components/info/addTheater/store.js'
import addNewsStore from '../components/info/information/addNewsStore.js'
import informationStore from '../components/info/information/informationStore.js'

export default new Vuex.Store({
	modules:{
		scheduleStore,
		addStudio,
		studioList,
		updateStudio,
		counter,
		addTheater,
		addNewsStore,
	}
})