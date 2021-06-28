export default {
    state() {
        return {
            aiId: '',
            aiName: '',
            aiList: null
        }
    },
    mutations: {
        setAiId(state, id) {
            state.aiId = id;
        },
        setAiName(state, name) {
            state.aiName = name;
        },
        setAiList(state, list) {
            state.aiList = list;
        }
    }
}