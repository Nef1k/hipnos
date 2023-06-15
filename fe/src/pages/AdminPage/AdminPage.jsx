import {useEffect, useRef, useState} from "react";
import PanelsContainer from "../../components/AdminComponents/PanelsContainer/PanelsContainer";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPage = () => {
  const dockRef = useRef(null);
  const [layout, setLayout] = useState({
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          size: 100,
          tabs: [
            {id: 'tab1', title: 'Tab 1', content: <div>Hello World 1</div>, closable: true},
            {id: 'tab2', title: 'Tab 2', content: <div>Hello World 2</div>, closable: true},
            {id: 'tab3', title: 'Tab 3', content: <div>Hello World 3</div>, closable: true},
            {id: 'tab4', title: 'Tab 4', content: <div>Hello World 4</div>, closable: true},
            {id: 'tab5', title: 'Tab 5', content: <div>Hello World 5</div>, closable: true},
          ],
        }
      ]
    }
  });

  const axiosPrivate = useAxiosPrivate();

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const serializeLayout = (layout) => {
    return JSON.stringify(layout, getCircularReplacer());
  }

  const pushLayout = async (layout) => {
    await axiosPrivate.post("synergy/test/", layout, {
      transformRequest: [(data) => {
        return serializeLayout(data);
      }],
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  const handleLayoutChange = async (newLayout) => {
    setLayout(newLayout);
  }

  useEffect(() => {
    const cleanup = () => {};
    if (!dockRef.current) return cleanup;

    const newSerializableLayout = dockRef.current.saveLayout();
    pushLayout(newSerializableLayout).catch();

    return cleanup;
  }, [layout]);

  return (
    <div style={{flexDirection: 'column', height: "100%"}}>
      <PanelsContainer
        layout={layout}
        dockRef={dockRef}
        onLayoutChange={handleLayoutChange}
      />
    </div>
  )
}

export default AdminPage;
