import avatar from "./avatar.vue";
import {mount} from "@vue/test-utils";

it("component render", async () => {
    const wrapper = mount(avatar);
    const component = await wrapper.find(".avatar-component");

    expect(component.exists()).toBe(true);
});

it("set props", async () => {
    const wrapper = mount(avatar);
    await wrapper.setProps({
        size: 4
    });

    expect(wrapper.vm.measures.width).toBe("4rem");
    expect(wrapper.vm.measures.height).toBe("4rem");
});

it("props type", async () => {
    const wrapper = mount(avatar);

    await wrapper.setProps({
        size: 2
    });

    expect(wrapper.props("size")).toEqual(expect.any(Number));
});