function Foo() {
  return <div>Test</div>;
}

export default {
  title: 'Test',
  component: Foo,
  args: {},
};

export function Default(args: any) {
  return <Foo {...args} />;
}
