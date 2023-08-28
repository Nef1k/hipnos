const hipnosApi = ({axiosPrivate}) => ({
  updateTab: async function (tabId, updateData, partially=true) {
    const doUpdate = partially ? axiosPrivate.patch : axiosPrivate.put;
    return await doUpdate(`synergy/tabs/${tabId}/`, updateData);
  }
});

export default hipnosApi;
