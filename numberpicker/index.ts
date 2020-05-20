import * as React from "react";
import * as ReactDOM from "react-dom";
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import NumberPicker, { INumberPickerProps } from "./NumberPicker";

export class numberpicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// Reference to notifyOutputChanged method
	private notifyOutputChanged: () => void;

	// Reference to container element
	private container: HTMLDivElement;

	// Properties that we will pass to our react component
	private props: INumberPickerProps = {
		notifyOnChange: this.onValueChanged.bind(this)
	}

	/**
	 * Empty constructor.
	 */
	constructor() {	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.notifyOutputChanged = notifyOutputChanged;
		this.container = container;
		this.props.value = context.parameters.numberValue.raw || 0;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Update property if the input value has changed.
		if (context.parameters.numberValue.raw !== this.props.value)
			this.props.value = context.parameters.numberValue.raw || 0;

		ReactDOM.render(
			React.createElement(
				NumberPicker,
				this.props
			),
			this.container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			numberValue: this.props.value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.container);
	}

	/** Called when the child react component's value is updated. */
	onValueChanged(newValue: number): void {
		if (this.props.value !== newValue) {
			this.props.value = newValue;
			this.notifyOutputChanged();
		}
	}
}