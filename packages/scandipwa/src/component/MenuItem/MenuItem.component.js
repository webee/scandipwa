/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AddIcon from 'Component/AddIcon';
import Link from 'Component/Link';
import MinusIcon from 'Component/MinusIcon';
import { MenuItemType } from 'Type/Menu';

/** @namespace Component/MenuItem/Component */
export class MenuItem extends PureComponent {
    static propTypes = {
        activeMenuItemsStack: PropTypes.array.isRequired,
        item: MenuItemType.isRequired,
        itemMods: PropTypes.object.isRequired,
        handleCategoryHover: PropTypes.func.isRequired,
        handleLinkLeave: PropTypes.func.isRequired,
        isLink: PropTypes.bool.isRequired,
        onItemClick: PropTypes.func,
        isExpandable: PropTypes.bool.isRequired
    };

    static defaultProps = {
        onItemClick: () => {}
    };

    renderPlusMinusIcon() {
        const { itemMods: { isExpanded } } = this.props;

        if (isExpanded) {
            return <MinusIcon />;
        }

        return <AddIcon />;
    }

    renderExpandButton() {
        const { isExpandable, itemMods } = this.props;

        if (!isExpandable) {
            return null;
        }

        return (
            <figcaption
              block="Menu"
              elem="ExpandedState"
              mods={ itemMods }
            >
                { this.renderPlusMinusIcon() }
            </figcaption>
        );
    }

    renderItemContent(item, itemMods) {
        const { title } = item;

        return (
            <figcaption
              block="Menu"
              elem="ItemCaption"
              mods={ itemMods }
            >
                { title }
                { this.renderExpandButton() }
            </figcaption>
        );
    }

    renderItemLinkContent() {
        const {
            activeMenuItemsStack,
            item,
            itemMods,
            handleCategoryHover,
            handleLinkLeave,
            onItemClick
        } = this.props;

        const {
            url,
            item_id
        } = item;

        const isHovered = activeMenuItemsStack.includes(item_id);

        return (
            <Link
              to={ url }
              block="Menu"
              elem="Link"
              id={ item_id }
              onMouseEnter={ handleCategoryHover }
              onMouseLeave={ handleLinkLeave }
              mods={ { isHovered } }
              onClick={ onItemClick }
            >
                { this.renderItemContent(item, itemMods) }
            </Link>
        );
    }

    render() {
        const { item, itemMods, isLink } = this.props;

        if (isLink) {
            return this.renderItemLinkContent();
        }

        return this.renderItemContent(item, itemMods);
    }
}

export default MenuItem;
