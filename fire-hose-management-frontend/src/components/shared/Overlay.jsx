import React, { useEffect, useRef, useState } from "react";
import "./style/overlay.scss";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";

const ESC_KEY_CODE = 27;

export const Overlay = ({
    size = "m",
    hasAnimation = true,
    headerContent = undefined,
    footerContent = undefined,
    onClose = undefined,
    className = "",
    dataTestId = "",
    ...otherProps
}) => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [initialTarget, setInitialTarget] = useState();

    const overlaySize = `size-${size}`;
    const noAnimation = hasAnimation ? "" : "no-animation";

    const footer = useRef(null);

    const _isElementAtViewportBottom = (el) => {
        const rect = el.getBoundingClientRect();
        return (window.innerHeight || document.documentElement.clientHeight) <= rect.bottom + 1;
    };

    useEffect(() => {
        footer.current?.classList.toggle("show-shadow", _isElementAtViewportBottom(footer.current));
    });

    const _close = () => {
        if (onClose) {
            onClose();
        }
    };

    const _setInitialTarget = (event) => {
        return setInitialTarget(event.target);
    };

    const _closeBackground = () => {
        let modalBackground = document.querySelector(".uli-overlay-background");

        if (initialTarget === modalBackground) {
            _close();
        }
    };

    useEffect(() => {
        const _escKeyPressed = (event) => {
            if (event.keyCode === ESC_KEY_CODE) {
                onClose();
            }
        };

        window.addEventListener("keydown", _escKeyPressed);
        return () => {
            window.removeEventListener("keydown", _escKeyPressed);
        };
    }, [onClose]);

    const scrollHandler = (e) => {
        let pxCount = e.target.scrollTop;

        if (pxCount > 0) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    };

    return (
        <div
            onMouseDown={_setInitialTarget}
            onClick={_closeBackground}
            className={`uli-overlay-background ${noAnimation} ${className}`}
        >
            <div onScroll={scrollHandler} className={`uli-overlay-panel ${overlaySize} ${noAnimation}`}>
                {headerContent ? (
                    <>
                        <div className={hasScrolled ? "uli-overlay-header show-shadow" : "uli-overlay-header"}>
                            {headerContent}
                            <IconButton onClick={() => _close()} className="uli-overlay-close">
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="uli-overlay-content">{otherProps.children}</div>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => _close()} className="uli-overlay-close only">
                            <CloseIcon />
                        </IconButton>
                        <div className="uli-overlay-content only">{otherProps.children}</div>
                    </>
                )}

                {footerContent && (
                    <div ref={footer} className="uli-overlay-footer">
                        {footerContent}
                    </div>
                )}
            </div>
        </div>
    );
};

Overlay.propTypes = {
    size: PropTypes.oneOf(["none", "s", "m", "l"]),
    hasAnimation: PropTypes.bool,
    headerContent: PropTypes.element,
    footerContent: PropTypes.element,
    onClose: PropTypes.func,
    className: PropTypes.string,
    dataTestId: PropTypes.string,
};
