const hipnosApi = ({axiosPrivate}) => ({
  updateTab: async function (tabId, updateData, partially=true) {
    const doUpdate = partially ? axiosPrivate.patch : axiosPrivate.put;
    return await doUpdate(`synergy/tabs/${tabId}/`, updateData);
  },
  getEvents: async function ({eventTypes}) {
    const result = await axiosPrivate.get(`hipnos/events/`);

    return result?.data;
  }
});

export default hipnosApi;
