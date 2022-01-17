<?php
/**
 * Add Call to Action ACF field group.
 *
 * @package byob-acf
 */

/**
 * Add field group.
 */
add_action(
	'acf/init',
	function() {
		acf_add_local_field_group(
			array(
				'key'                                   => 'group_6193566736e20',
				'title'                                 => 'Block: CTA',
				'fields'                                => array(
					array(
						'key'               => 'field_619361304b293',
						'label'             => 'Call To Action',
						'name'              => '',
						'type'              => 'message',
						'instructions'      => '',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'message'           => 'Call the viewer to action!',
						'new_lines'         => 'wpautop',
						'esc_html'          => 0,
					),
					array(
						'key'               => 'field_619356b40ac11',
						'label'             => 'Heading (Question)',
						'name'              => 'heading-question',
						'type'              => 'text',
						'instructions'      => 'Enter the question part of the heading.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'default_value'     => '',
						'placeholder'       => '',
						'prepend'           => '',
						'append'            => '',
						'maxlength'         => '',
					),
					array(
						'key'               => 'field_619357000ac12',
						'label'             => 'Heading (Call)',
						'name'              => 'heading-call',
						'type'              => 'text',
						'instructions'      => 'Enter the call to action part of the heading.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'default_value'     => '',
						'placeholder'       => '',
						'prepend'           => '',
						'append'            => '',
						'maxlength'         => '',
					),
					array(
						'key'               => 'field_619357970ac13',
						'label'             => 'Primary CTA Button',
						'name'              => 'primary-cta',
						'type'              => 'link',
						'instructions'      => '',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'return_format'     => 'array',
					),
					array(
						'key'               => 'field_619357e00ac14',
						'label'             => 'Secondary CTA Button',
						'name'              => 'secondary-cta',
						'type'              => 'link',
						'instructions'      => '',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'return_format'     => 'array',
					),
				),
				'location'                              => array(
					array(
						array(
							'param'    => 'block',
							'operator' => '==',
							'value'    => 'acf/byob-call-to-action',
						),
					),
				),
				'menu_order'                            => 0,
				'position'                              => 'normal',
				'style'                                 => 'default',
				'label_placement'                       => 'top',
				'instruction_placement'                 => 'label',
				'hide_on_screen'                        => '',
				'active'                                => true,
				'description'                           => '',
				'show_in_rest'                          => 1,
				'show_in_graphql'                       => 1,
				'graphql_field_name'                    => 'acfAttributes',
				'map_graphql_types_from_location_rules' => 0,
				'graphql_types'                         => '',
			)
		);
	}
);
