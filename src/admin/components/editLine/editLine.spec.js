import editLine from "./editLine.vue";
import icon from "../icon/icon.vue";
import { mount } from "@vue/test-utils";

it("component render", async () => {
    const wrapper = mount(editLine);
    const component = await wrapper.find(".edit-line-component");

    expect(component.exists()).toBe(true);
});

it("editmode worked", async () => {
    const wrapper = mount(editLine);

    await wrapper.setProps({
        editmode: false
    });

    const icons = await wrapper.findComponent(icon);
    await icons.trigger("click");

    const editedInput = await wrapper.find(".input");
    expect(editedInput.exists()).toBe(true);
});

it("snapshots", async () => {
    const wrapper = mount(editLine);

    expect(wrapper.element).toMatchSnapshot();
});