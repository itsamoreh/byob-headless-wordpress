import PropTypes from 'prop-types'

export default function ArchiveHeader({
  imageUrl,
  imageAlt,
  preposition,
  title,
  description,
}) {
  return (
    <header className="-mt-[7.75rem] bg-block-pattern">
      <div className="container flex flex-col mx-auto mb-10 md:mb-16">
        <div className="max-w-md py-16 mx-auto text-center md:py-32 md:max-w-none md:text-left">
          {imageUrl && (
            <img
              className="mb-4 md:mb-0 md:mr-10 rounded-full mx-auto object-cover w-48 h-48 aspect-[1/1] shadow-md md:float-left [shape-outside:circle()]"
              src={imageUrl}
              alt={imageAlt || ''}
            />
          )}
          <h1 className="text-3xl font-extrabold leading-tight break-words md:text-4xl">
            {preposition}{' '}
            <span className="text-4xl text-indigo-600 md:text-5xl">
              {title}
            </span>
          </h1>

          {description && (
            <p className="mt-2 md:mt-4 max-w-[75ch] text-sm text-gray-600 md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

ArchiveHeader.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  preposition: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

ArchiveHeader.defaultProps = {
  preposition: '',
  title: '',
}
