import PanelsContainer from "../../PanelsContainer/PanelsContainer";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export const emptyLayout = () => ({
  dockbox: {
    mode: 'horizontal',
    children: []
  }
})

const TabsPanel = forwardRef(({pageName, page, onLayoutSave}, ref) => {
  const dockRef = useRef(null);
  const [layout, setLayout] = useState(emptyLayout());
  const [canSave, setCanSave] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const bigRandom = () => Math.trunc(Math.random() * 1000000000)

  const newWindow = () => {
    return {
      x: 100,
      y: 100,
      w: 480,
      h: 320,
      tabs: [{
        id: bigRandom().toString(),
        title: "New Tab",
      }]
    }
  }

  const createWindow = (currentLayout) => {
    const layout = JSON.parse(JSON.stringify(currentLayout));
    layout.floatbox = layout.floatbox || {};
    layout.floatbox.children = layout.floatbox.children || [];
    layout.floatbox.children.push(newWindow())
    return layout;
  }

  useImperativeHandle(ref, () => ({
    async createWidget() {
      const srcLayout = dockRef.current.saveLayout();
      dockRef.current.loadLayout(createWindow(srcLayout));
    }
  }));

  const pushLayout = async (pageName, layout) => {
    await axiosPrivate.put(`synergy/pages/${pageName}/`, {
      page_data: layout,
    });
  }

  const loadTab = (data) => {
    return {
      "id": data.id,
      "title": "The tab",
      "content": <div>Content goes here...{data.id}</div>,
      "closable": true,
    };
  }

  const handleLayoutChange = async (newLayout) => {
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
