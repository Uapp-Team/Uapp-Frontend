import createPersistedState from "use-persisted-state";
const useSidebarStatus = createPersistedState("sidebarStatus");

const useData = () => {
  const [sidebar, setSidebar] = useSidebarStatus(null);

  return {
    sidebar,
    setSidebar,
  };
};

export default useData;
