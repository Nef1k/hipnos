import PanelsContainer from "../../PanelsContainer/PanelsContainer";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import TabRenderer from "../TabDispatcher/TabDispatcher";

export const emptyLayout = () => ({
  dockbox: {
    mode: 'horizontal',
    children: []
  }
})

const TabsPanel = forwardRef(({pageName, page, tabTypes, onLayoutSave, onTabsReload, onTabRemove}, ref) => {
  const dockRef = useRef(null);
  const [layout, setLayout] = useState(emptyLayout());
  const [canSave, setCanSave] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const bigRandom = () => Math.trunc(Math.random() * 1000000000);

  const newWindow = (id) => {
    // const id = bigRandom().toString();
    return {
      id,
      window: {
      x: 100,
      y: 100,
      w: 480,
      h: 320,
      tabs: [{
        id,
        title: "New Widget",
      }]
    }}
  }

  const createWindow = (currentLayout, id) => {
    const newWnd = newWindow(id);

    const layout = JSON.parse(JSON.stringify(currentLayout));
    layout.floatbox = layout.floatbox || {};
    layout.floatbox.children = layout.floatbox.children || [];
    layout.floatbox.children.push(newWnd.window);
    return layout;
  }

  useImperativeHandle(ref, () => ({
    async createWidget(id) {
      const srcLayout = dockRef.current.saveLayout();
      const layout = createWindow(srcLayout, id)
      await pushLayout(pageName, layout).catch();
      dockRef.current.loadLayout(layout);
      onTabsReload && onTabsReload();

      return id;
    },
    getCurrentPage() {
      return page;
    }
  }), [page]);

  const pushLayout = async (pageName, layout) => {
    await axiosPrivate.put(`synergy/pages/${pageName}/`, {
      page_data: layout,
    });
  }

  const getTabInfo = (tabId) => {
    const tabs = page?.tabs.filter((tab) => tab.id == tabId);
    return Boolean(tabs.length) ? tabs[0] : null
  }

  const loadTab = (tabData) => {
    const tabInfo = getTabInfo(tabData.id);
    // console.log(tabInfo);

    return {
      "id": tabData.id.toString(),
      "title": tabInfo?.display_name,
      "content": <TabRenderer tabInfo={tabInfo} tabTypes={tabTypes} />,
      "closable": true,
    };
  }

  const handleLayoutChange = async (newLayout, tabId, direction) => {
    if (direction === "remove") {
      onTabRemove && onTabRemove(tabId);
    }
    setLayout(newLayout);
  }

  useEffect(() => {
    const cleanup = () => {
    };
    if (!dockRef.current || !canSave) return cleanup;

    const newSerializableLayout = dockRef.current.saveLayout();
    pushLayout(pageName, newSerializableLayout).catch();

    return cleanup;
  }, [layout]);

  useEffect(() => {
    const cleanup = () => {
    };
    if (!dockRef.current) return cleanup;

    const newLayout = page?.page_data || emptyLayout();
    dockRef.current.loadLayout(newLayout);
    setCanSave(true);

    return cleanup;
  }, [page]);

  return (
    <PanelsContainer
      layout={layout}
      loadTab={loadTab}
      dockRef={dockRef}
      onLayoutChange={handleLayoutChange}
    />
  );
});

export default TabsPanel;
