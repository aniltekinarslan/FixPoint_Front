import { Notification, Message } from 'element-ui';

const state = {
};

const getters = {
};

export const mutations = {
}

const actions = {
    alert: ({ commit }, msg) => {
        let result = msg.msg
        if (msg.errors) {
          Object.keys(msg.errors).forEach((key) => {
            result = result + '</p>' + msg.errors[key][0]
          })
        }
    
        Notification({
          title: msg.title,
          dangerouslyUseHTMLString: true,
          message: result,
          type: msg.type
        })
    },
    message: ({ commit }, msg) => {
        Message({
            dangerouslyUseHTMLString: true,
            message: msg.msg,
            type: msg.type
        })
    },
};

export const alert = {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};