import Layout from "./Layout";

const withLayout = (WrappedComponent, settings) => {
  return (props) => {
    return (
      <Layout settings={settings}>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
};

export default withLayout;
