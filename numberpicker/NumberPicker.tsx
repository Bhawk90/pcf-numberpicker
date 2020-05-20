import * as React from "react";
import { Stack, IconButton, TextField, Button, FontIcon } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';

export interface INumberPickerProps {
    value?: number,
    notifyOnChange?: (newValue: number) => void;
}

export interface INumberPickerState {
    value: number
}

export default class NumberPicker extends React.Component<INumberPickerProps, INumberPickerState>
{
    //#region Constructor

    constructor(props: INumberPickerProps) {
        super(props);

        initializeIcons();

        // Set initial state
        this.state = {
            value: props.value || 0
        };

        // Bind event handlers
        this.onIconButtonAdd_Click = this.onIconButtonAdd_Click.bind(this);
        this.onIconButtonMinus_Click = this.onIconButtonMinus_Click.bind(this);
    }
    
    //#endregion Constructor

    //#region Component Methods

    /** Updates the component when input properties are changing. */
    public componentWillReceiveProps(newProps: INumberPickerProps): void {
        this.setState({
            value: newProps.value || this.state.value
        });
    }

    //#endregion Component Methods

    //#region Render Component

    render() {
        return (
            <Stack tokens={{ childrenGap: 4 }} horizontal verticalAlign="center">

                <Button onClick={this.onIconButtonMinus_Click} default>
                    <FontIcon iconName="Remove" />
                </Button>

                <TextField 
                    value={this.state.value.toString()} 
                    type="number"
                    borderless
                    style={{ textAlign: 'center' }}
                    readOnly />

                <Button onClick={this.onIconButtonAdd_Click} default>
                    <FontIcon iconName="Add" />
                </Button>

            </Stack>
        );
    }

    //#endregion Render Component

    //#region Event Handlers

    /** Decrease our number with 1 on click. */
    onIconButtonMinus_Click() {
        this.setState({
            value: this.state.value - 1
        }, 
        () => {
            // Notify on change after state has been updated
            if (this.props.notifyOnChange) {
                this.props.notifyOnChange(this.state.value);
            }
        });
    }

    /** Increments our number with 1 on click. */
    onIconButtonAdd_Click() {
        this.setState({
            value: this.state.value + 1
        }, 
        () => {
            // Notify on change after state has been updated
            if (this.props.notifyOnChange) {
                this.props.notifyOnChange(this.state.value);
            }
        });
    }

    //#endregion Render Component
}