import { RenderOptions, render } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

const MockedProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <DragDropContext onDragEnd={jest.fn()}>
            {children}
        </DragDropContext>
    )
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: MockedProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
