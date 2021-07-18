import defaultBtn from "./defaultBtn.vue";
import { mount } from "@vue/test-utils";

it("component render", async () => {
    const wrapper = mount(defaultBtn);
    const component = await wrapper.find(".btn-decorator");

    expect(component.exists()).toBe(true);
});

it("component render type file", async () => {
    const wrapper = mount(defaultBtn);

    await wrapper.setProps({
        typeAttr: "file"
    });

    const fileElement = await wrapper.find(".btn-file-input");
    expect(fileElement.exists()).toBe(true);
});

it("component class added", async () => {
    const wrapper = mount(defaultBtn);

    await wrapper.setProps({
        disabled: true
    });

    const fileElement = await wrapper.find(".btn-decorator");
    expect(fileElement.classes("disabled")).toBe(true);
});

it("component btn container text", async () => {
    const wrapper = mount(defaultBtn);

    await wrapper.setProps({
        title: "Text"
    });

    const fileElement = await wrapper.find(".btn-decorator");
    expect(fileElement.text()).toEqual("Text");
});

it("snapshots", async () => {
    const wrapper = mount(defaultBtn);

    expect(wrapper.element).toMatchSnapshot();
});